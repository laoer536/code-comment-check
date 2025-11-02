import {
  VariableDeclaration,
  TsInterfaceDeclaration,
  TsTypeAliasDeclaration,
  ExportDeclaration,
  Module,
  ModuleDeclaration,
  type Declaration,
} from '@swc/core'

import Visitor from './base'

// ========== 工具函数 ==========
function getLineAndColumn(code: string, offset: number) {
  let line = 1,
    col = 0
  for (let i = 0; i < offset; i++) {
    if (code[i] === '\n') {
      line++
      col = 0
    } else {
      col++
    }
  }
  return { line, col }
}

function getPreviousLine(code: string, start: number): string {
  const prevNewline = code.lastIndexOf('\n', start - 1)
  if (prevNewline === -1) return ''
  const prevPrevNewline = code.lastIndexOf('\n', prevNewline - 1)
  return code.slice(prevPrevNewline + 1, prevNewline).replace(/\r$/, '')
}

function getCurrentLine(code: string, start: number): string {
  const lineStart = code.lastIndexOf('\n', start - 1)
  const lineEnd = code.indexOf('\n', start)
  return code.slice(lineStart + 1, lineEnd === -1 ? code.length : lineEnd).trim()
}

export class ASTVisitor extends Visitor {
  constructor(
    private filePath: string,
    private code: string,
  ) {
    super()
  }

  results: { filePath: string; line: number; code: string }[] = []

  private checkNode(node: { span: { start: number } }) {
    const prevLine = getPreviousLine(this.code, node.span.start).trim()
    const hasComment = prevLine.includes('//') || prevLine.includes('*/')

    if (!hasComment) {
      const { line } = getLineAndColumn(this.code, node.span.start)
      const codeLine = getCurrentLine(this.code, node.span.start)
      this.results.push({
        filePath: this.filePath,
        line,
        code: codeLine,
      })
    }
  }

  override visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
    this.checkNode(node)
    return super.visitVariableDeclaration(node)
  }

  override visitExportDeclaration(node: ExportDeclaration): ModuleDeclaration {
    this.checkNode(node)
    return super.visitExportDeclaration(node)
  }

  override visitTsInterfaceDeclaration(node: TsInterfaceDeclaration): TsInterfaceDeclaration {
    this.checkNode(node)
    return super.visitTsInterfaceDeclaration(node)
  }

  override visitTsTypeAliasDeclaration(node: TsTypeAliasDeclaration): Declaration {
    this.checkNode(node)
    return super.visitTsTypeAliasDeclaration(node)
  }
}

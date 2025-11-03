import type {
  VariableDeclaration,
  TsInterfaceDeclaration,
  TsTypeAliasDeclaration,
  ExportDeclaration,
  TsType,
  ClassDeclaration,
  TsEnumDeclaration,
  TsModuleDeclaration,
  FunctionDeclaration,
} from '@swc/core'

import Visitor from './base'

// ========== Tool functions ==========
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
  filePath: string
  code: string
  results: { filePath: string; line: number; code: string }[] = []
  offset: number

  constructor(filePath: string, code: string, offset: number) {
    super()
    this.filePath = filePath
    this.code = code
    this.offset = offset
  }

  private checkNode(node: { span: { start: number } }) {
    const start = node.span.start - this.offset
    const prevLine = getPreviousLine(this.code, start).trim()
    const hasComment = prevLine.includes('//') || prevLine.includes('*/')

    if (!hasComment) {
      const { line } = getLineAndColumn(this.code, start)
      const codeLine = getCurrentLine(this.code, start)
      this.results.push({
        filePath: this.filePath,
        line,
        code: codeLine,
      })
    }
  }

  override visitVariableDeclaration(node: VariableDeclaration) {
    this.checkNode(node)
    return super.visitVariableDeclaration(node)
  }

  override visitFunctionDeclaration(node: FunctionDeclaration) {
    this.checkNode(node)
    return super.visitFunctionDeclaration(node)
  }

  override visitClassDeclaration(node: ClassDeclaration) {
    this.checkNode(node)
    return super.visitClassDeclaration(node)
  }

  override visitTsEnumDeclaration(node: TsEnumDeclaration) {
    this.checkNode(node)
    return super.visitTsEnumDeclaration(node)
  }

  override visitTsModuleDeclaration(node: TsModuleDeclaration) {
    this.checkNode(node)
    return super.visitTsModuleDeclaration(node)
  }

  override visitExportDeclaration(node: ExportDeclaration) {
    const decl = node.declaration

    // Manually call subdeclaration access logic to avoid quadratic recursion of super
    if (decl?.type === 'VariableDeclaration') {
      this.visitVariableDeclaration(decl)
    } else if (decl?.type === 'TsInterfaceDeclaration') {
      this.visitTsInterfaceDeclaration(decl)
    } else if (decl?.type === 'TsTypeAliasDeclaration') {
      this.visitTsTypeAliasDeclaration(decl)
    } else if (decl?.type === 'FunctionDeclaration') {
      this.visitFunctionDeclaration(decl)
    } else if (decl?.type === 'ClassDeclaration') {
      this.visitClassDeclaration(decl)
    } else if (decl?.type === 'TsEnumDeclaration') {
      this.visitTsEnumDeclaration(decl)
    } else if (decl?.type === 'TsModuleDeclaration') {
      this.visitTsModuleDeclaration(decl)
    }

    return node // Super is not called
  }

  override visitTsType(n: TsType) {
    return n
  }

  override visitTsInterfaceDeclaration(node: TsInterfaceDeclaration) {
    this.checkNode(node)
    return super.visitTsInterfaceDeclaration(node)
  }

  override visitTsTypeAliasDeclaration(node: TsTypeAliasDeclaration) {
    this.checkNode(node)
    return super.visitTsTypeAliasDeclaration(node)
  }
}

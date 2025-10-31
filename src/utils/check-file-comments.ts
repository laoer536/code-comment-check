import { promises as fs } from 'fs'
import { parse, type Module } from '@swc/core'
import chalk from 'chalk'
import { getChangedLines } from './get-changed-lines'

export async function checkFileComments(filePath: string, strict: boolean) {
  const code = await fs.readFile(filePath, 'utf8')
  const lines = code.split('\n')
  const changedLines = strict ? null : await getChangedLines(filePath)

  const isTS = filePath.endsWith('.ts') || filePath.endsWith('.tsx')
  const isTSX = filePath.endsWith('.tsx')
  const isJSX = filePath.endsWith('.jsx')

  let ast: Module
  try {
    ast = (await parse(code, {
      syntax: isTS ? 'typescript' : 'ecmascript',
      tsx: isTSX || isJSX,
      decorators: true,
      comments: true,
      target: 'esnext',
      script: false,
    })) as Module
  } catch (e: any) {
    console.error(chalk.red(`❌ Failed to parse ${filePath}: ${e.message}`))
    return []
  }

  const missing: { filePath: string; line: number; code: string }[] = []

  function walk(node: any): void {
    if (!node || typeof node !== 'object') return

    if (node.type === 'VariableDeclaration') {
      const start = node.span?.start ?? 0
      const before = code.slice(0, start)
      const lineNumber = before.split('\n').length
      const prevLine = lines[lineNumber - 2] || ''
      const hasComment = prevLine.trim().startsWith('//') || prevLine.trim().startsWith('/*') || prevLine.includes('*')

      const declCode = lines[lineNumber - 1].trim()

      // ✅ 如果不是 strict 模式，只检查改动区域
      if (!strict && changedLines && !changedLines.has(lineNumber)) {
        return
      }

      if (!hasComment) {
        missing.push({ filePath, line: lineNumber, code: declCode })
      }
    }

    for (const key in node) {
      const value = node[key]
      if (Array.isArray(value)) value.forEach(walk)
      else if (typeof value === 'object') walk(value)
    }
  }

  walk(ast)
  return missing
}

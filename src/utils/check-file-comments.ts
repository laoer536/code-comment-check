import fs from 'fs'
import { type Module, parseSync } from '@swc/core'
import chalk from 'chalk'
import { ASTVisitor } from '../visitor/my-visitor'
import { getChangedLines } from './get-changed-lines'

export async function checkFileComments(filePath: string, strict: boolean) {
  const code = fs.readFileSync(filePath, 'utf8')
  const isTS = filePath.endsWith('.ts') || filePath.endsWith('.tsx')
  const isTSX = filePath.endsWith('.tsx')
  const isJSX = filePath.endsWith('.jsx')

  let offset: number
  let ast: Module
  try {
    offset = parseSync('', {
      syntax: 'ecmascript',
      comments: true,
      script: false,
      target: 'es2020',
    }).span.end
    ast = parseSync(code, {
      syntax: isTS ? 'typescript' : 'ecmascript',
      tsx: isTSX,
      jsx: isJSX,
      decorators: true,
      comments: true,
      target: 'esnext',
      script: false,
    })
  } catch (e: any) {
    console.error(chalk.red(`❌ Failed to parse ${filePath}: ${e.message}`))
    return []
  }
  const visitor = new ASTVisitor(filePath, code, offset)
  visitor.visitModule(ast)

  // Check the data in full
  const baseResults = visitor.results

  if (strict) {
    return baseResults
  } else {
    // Check the data in changed lines
    const changedLines = await getChangedLines(filePath)
    return baseResults.filter((r) => changedLines.has(r.line))
  }
}

import fs from 'fs'
import { parse, type Module, parseSync } from '@swc/core'
import chalk from 'chalk'
import { ASTVisitor } from '../visitor/my-visitor'

export function checkFileComments(filePath: string, strict: boolean) {
  const code = fs.readFileSync(filePath, 'utf8')
  const isTS = filePath.endsWith('.ts') || filePath.endsWith('.tsx')
  const isTSX = filePath.endsWith('.tsx')
  const isJSX = filePath.endsWith('.jsx')

  let ast: Module
  try {
    ast = parseSync(code, {
      syntax: isTS ? 'typescript' : 'ecmascript',
      tsx: isTSX || isJSX,
      decorators: true,
      comments: true,
      target: 'esnext',
      script: false,
    })
  } catch (e: any) {
    console.error(chalk.red(`❌ Failed to parse ${filePath}: ${e.message}`))
    return []
  }
  const visitor = new ASTVisitor(filePath, code)
  visitor.visitModule(ast)
  return visitor.results
}

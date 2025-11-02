import fs from 'fs'
import { parse, type Module } from '@swc/core'
import chalk from 'chalk'
import { ASTVisitor } from '../visitor/my-visitor'

export async function checkFileComments(filePath: string, strict: boolean) {
  const code = fs.readFileSync(filePath, 'utf8')
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

  const visitor = new ASTVisitor(filePath, code)
  visitor.visitModule(ast)

  return visitor.results
}

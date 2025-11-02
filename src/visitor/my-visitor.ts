import Visitor from './base'
import type { VariableDeclaration } from '@swc/core'

class ASTVisitor extends Visitor {
  override visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
    console.log('node', node)
    return super.visitVariableDeclaration(node)
  }
}

export default new ASTVisitor()

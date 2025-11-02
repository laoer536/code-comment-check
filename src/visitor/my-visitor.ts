import Visitor from './base'
import type { TsType, VariableDeclaration } from '@swc/core'

class ASTVisitor extends Visitor {
  override visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
    console.log('node', node)
    return super.visitVariableDeclaration(node)
  }
  override visitTsType(node: TsType) {
    return node
  }
}

export default new ASTVisitor()

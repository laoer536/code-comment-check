import Visitor from './base'
import type {
  ExportDeclaration,
  ModuleDeclaration,
  TsInterfaceDeclaration,
  TsType,
  VariableDeclaration,
} from '@swc/core'

class ASTVisitor extends Visitor {
  override visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
    console.log('node', node)
    return super.visitVariableDeclaration(node)
  }
  override visitTsType(node: TsType) {
    return node
  }

  override visitExportDeclaration(n: ExportDeclaration): ModuleDeclaration {
    console.log('ExportDeclaration', n)
    return super.visitExportDeclaration(n)
  }

  override visitTsInterfaceDeclaration(n: TsInterfaceDeclaration): TsInterfaceDeclaration {
    console.log('TsInterfaceDeclaration', n)
    return super.visitTsInterfaceDeclaration(n)
  }
}

export default new ASTVisitor()

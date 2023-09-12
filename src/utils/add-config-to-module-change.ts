import * as ts from 'typescript';
import {getSourceNodes} from "@schematics/angular/utility/ast-utils";
import {InsertChange} from "@schematics/angular/utility/change";
import {SchematicsException} from '@angular-devkit/schematics';


function isImportIdentifier(node: ts.Node) {
  return node.kind === ts.SyntaxKind.Identifier && node.getText() === 'imports'
}

function getImportsNode(nodes: ts.Node[] = []) {
  return nodes.find(n => n.getChildren().find(isImportIdentifier));
}

function createAddToImportsChange(path: any, node: ts.Node) {
  const arrayLiteralNode = node.getChildren().find(n => n.kind === ts.SyntaxKind.ArrayLiteralExpression);
  const importsListNode = arrayLiteralNode?.getChildren().find(n => n.kind === ts.SyntaxKind.SyntaxList) as ts.Node;

  const importToInsert = `
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validate,
    }),`;
  return new InsertChange(path, importsListNode.getEnd(), importToInsert);
}

function createImportsChange(path: any, node: ts.Node) {
  console.log(node);
  const importToInsert = `
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validate,
    }),
  ],`;
  return new InsertChange(path, node.pos, importToInsert)
}

export function addConfigToModuleChange(sourceText: string, context: any): any {
  let sourceFile = ts.createSourceFile(context.path, sourceText, ts.ScriptTarget.Latest, true);
  let nodes: ts.Node[] = getSourceNodes(sourceFile);


  const decoratorNode = nodes.find(n => n.kind === ts.SyntaxKind.Decorator);
  const decoratorObject = decoratorNode?.getChildAt(1).getChildAt(2).getChildAt(0).getChildAt(1)

  if (!decoratorObject) {
    throw new SchematicsException('Module decorator missing');
  }

  const objectProperties = decoratorObject?.getChildren().filter(n => n.kind === ts.SyntaxKind.PropertyAssignment)
  const importsNode = getImportsNode(objectProperties);

  let importChange;
  if (importsNode) {
    importChange = createAddToImportsChange(context.path, importsNode);
  } else {
    importChange = createImportsChange(context.path, decoratorObject);
  }

  return importChange;
}

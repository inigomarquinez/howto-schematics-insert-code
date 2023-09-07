import {SchematicsException, Tree} from "@angular-devkit/schematics";
import * as ts from 'typescript';
import {getSourceNodes} from "@schematics/angular/utility/ast-utils";
import { inspect } from 'util'
import * as fs from 'fs';

import { InsertChange } from "@schematics/angular/utility/change";

function printToFile(data: any) {
  fs.writeFileSync('./nodes.json', inspect(data));
}

export function addConfigToModuleChange(context: any, tree: Tree): any {
  let sourceText = tree.readText(context.path); // reads the file from the tree
  if (!sourceText) throw new SchematicsException(`File does not exist.`); // throw an error if the file doesn't exist

//   const imports = `
// import { ConfigModule } from '@nestjs/config';
// import config, { validate } from './config/configuration';
//   `;

//   const moduleImports = `
// ConfigModule.forRoot({
//   isGlobal: true,
//   load: [config],
//   validate,
// }),
//   `
  // create the typescript source file
  let sourceFile = ts.createSourceFile(context.path, sourceText, ts.ScriptTarget.Latest, true);

  // get the nodes of the source file
  let nodes: ts.Node[] = getSourceNodes(sourceFile);

  // console.log(JSON.stringify(inspect(nodes)));
  printToFile('./nodes.json', inspect(nodes));

  // // find the people node by checking the SyntaxKind to be Identifier and by checking the node text to be people
  const importNodes = nodes.filter(n => n.kind === ts.SyntaxKind.ImportDeclaration);
  // printToFile(importNodes);

  let imports = `import { ConfigModule } from '@nestjs/config';
import config, { validate } from './config/configuration';`;

  let lastImportsPos = 0;
  if(importNodes.length) {
    imports = `\n${imports}`;
    lastImportsPos = importNodes[importNodes.length - 1].getEnd()
  } else {
    imports = `${imports}\n\n`;
  }

  return new InsertChange(context.path, lastImportsPos, imports);
  //
  // if (!peopleNode || !peopleNode.parent) {
  //   throw new SchematicsException(`expected people variable in ${context.path}`);
  // }
  //
  // // define peopleNode's sibling nodes and remove peopleNode from it
  // let peopleNodeSiblings = peopleNode.parent.getChildren();
  // let peopleNodeIndex = peopleNodeSiblings.indexOf(peopleNode);
  // peopleNodeSiblings = peopleNodeSiblings.slice(peopleNodeIndex);
  //
  // // get people array literal experssion from the siblings, this means this sign "["
  // let peopleArrayLiteralExpressionNode = peopleNodeSiblings.find(n => n.kind === ts.SyntaxKind.ArrayLiteralExpression);
  //
  // if (!peopleArrayLiteralExpressionNode) {
  //   throw new SchematicsException(`people ArrayLiteralExpression node is not defined`);
  // }
  //
  // // get people array list node which is in the children of peopleArrayLiteralExpressionNode and its kind of SyntaxList
  // let peopleListNode = peopleArrayLiteralExpressionNode.getChildren().find(n => n.kind === ts.SyntaxKind.SyntaxList);
  //
  // if (!peopleListNode) {
  //   throw new SchematicsException(`people list node is not defined`);
  // }
  //
  // const personToAdd = `,
  // {
  //   name: "${context.name}",
  //   sex: "${context.sex}"
  // }`;
  //
  // // insert the new person to the end of the array (at the end of the peopleListNode
  // return new InsertChange(path, peopleListNode.getEnd(), personToAdd);
}

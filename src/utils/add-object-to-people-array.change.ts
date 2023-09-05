import { SchematicsException, Tree } from "@angular-devkit/schematics";
import * as ts from 'typescript';
import { getSourceNodes } from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";

import { AddObjectToPeopleArrayContext } from "./add-object-to-people-array.context";

// utils/add-object-to-people-array.change.ts
export function addObjectToArrayChange(context: AddObjectToPeopleArrayContext, tree: Tree): InsertChange {
  let sourceText = tree.readText(context.path); // reads the file from the tree
  if (!sourceText) throw new SchematicsException(`File does not exist.`); // throw an error if the file doesn't exist

  // create the typescript source file
  let sourceFile = ts.createSourceFile(context.path, sourceText, ts.ScriptTarget.Latest, true);

  // get the nodes of the source file
  let nodes: ts.Node[] = getSourceNodes(sourceFile);
  // find the people node by checking the SyntaxKind to be Identifier and by checking the node text to be people
  const peopleNode = nodes.find(n => n.kind === ts.SyntaxKind.Identifier && n.getText() === 'people');

  if (!peopleNode || !peopleNode.parent) {
    throw new SchematicsException(`expected people variable in ${context.path}`);
  }

  // define peopleNode's sibling nodes and remove peopleNode from it
  let peopleNodeSiblings = peopleNode.parent.getChildren();
  let peopleNodeIndex = peopleNodeSiblings.indexOf(peopleNode);
  peopleNodeSiblings = peopleNodeSiblings.slice(peopleNodeIndex);

  // get people array literal experssion from the siblings, this means this sign "["
  let peopleArrayLiteralExpressionNode = peopleNodeSiblings.find(n => n.kind === ts.SyntaxKind.ArrayLiteralExpression);

  if (!peopleArrayLiteralExpressionNode) {
    throw new SchematicsException(`people ArrayLiteralExpression node is not defined`);
  }

  // get people array list node which is in the children of peopleArrayLiteralExpressionNode and its kind of SyntaxList
  let peopleListNode = peopleArrayLiteralExpressionNode.getChildren().find(n => n.kind === ts.SyntaxKind.SyntaxList);

  if (!peopleListNode) {
    throw new SchematicsException(`people list node is not defined`);
  }

  const personToAdd = `,
  {
    name: "${context.name}",
    sex: "${context.sex}"
  }`;

  // insert the new person to the end of the array (at the end of the peopleListNode
  return new InsertChange(context.path, peopleListNode.getEnd(), personToAdd);
}
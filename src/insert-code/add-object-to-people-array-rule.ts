import { Rule, Tree } from "@angular-devkit/schematics";
import { addObjectToArrayChange } from "../utils/add-object-to-people-array.change";
import { createAddObjectToPeopleArrayContext } from "../utils/add-object-to-people-array.context";

export function addObjectToPeopleArrayRule(options: any): Rule {
  return (tree: Tree) => {
    let context = createAddObjectToPeopleArrayContext(options);
    let change = addObjectToArrayChange(context, tree);
    const declarationRecorder = tree.beginUpdate(context.path);
    declarationRecorder.insertLeft(change.pos, change.toAdd);
    tree.commitUpdate(declarationRecorder);

    return tree;
  };
}
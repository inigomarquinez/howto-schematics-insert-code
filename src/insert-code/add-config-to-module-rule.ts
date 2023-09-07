import { Rule, Tree } from "@angular-devkit/schematics";
import { addConfigToModuleChange } from '../utils/add-config-to-module-change';

export function addConfigToModuleRule(_options: any): Rule {
  return (tree: Tree) => {
    const path = './demoFiles/app.module.ts';
    let change = addConfigToModuleChange({path}, tree);
    const declarationRecorder = tree.beginUpdate(path);
    declarationRecorder.insertLeft(change.pos, change.toAdd);
    tree.commitUpdate(declarationRecorder);

    return tree;
  };
}

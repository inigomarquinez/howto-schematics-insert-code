import {Rule, SchematicsException, Tree} from "@angular-devkit/schematics";
import {addConfigToModuleChange} from '../utils/add-config-to-module-change';
import {addImportsToFileChange} from '../utils/add-imports-to-file-change';

export function addConfigToModuleRule(_options: any): Rule {
  return (tree: Tree) => {
    const path = './demoFiles/app.module.ts';

    let sourceText = tree.readText(path);
    if (!sourceText) throw new SchematicsException(`File does not exist.`);

    const importsChange = addImportsToFileChange(sourceText, {path});
    const moduleChange = addConfigToModuleChange(sourceText, {path});

    const declarationRecorder = tree.beginUpdate(path);
    declarationRecorder.insertLeft(importsChange.pos, importsChange.toAdd);
    declarationRecorder.insertLeft(moduleChange.pos, moduleChange.toAdd);
    tree.commitUpdate(declarationRecorder);

    return tree;
  };
}

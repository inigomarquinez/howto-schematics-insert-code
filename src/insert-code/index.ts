import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { addConfigToModuleRule} from './add-config-to-module-rule';

export function main(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rule = chain([
      addConfigToModuleRule(options)
    ]);

    return rule(tree, context);
  };
}

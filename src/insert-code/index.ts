import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { addObjectToPeopleArrayRule } from './add-object-to-people-array-rule';

export function main(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rule = chain([
      addObjectToPeopleArrayRule(options)
    ]);

    return rule(tree, context);
  };
}

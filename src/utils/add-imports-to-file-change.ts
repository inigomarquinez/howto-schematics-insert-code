import * as ts from 'typescript';
import {getSourceNodes} from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";


export function addImportsToFileChange(sourceText: string, context: any): any {
  let sourceFile = ts.createSourceFile(context.path, sourceText, ts.ScriptTarget.Latest, true);
  let nodes: ts.Node[] = getSourceNodes(sourceFile);

  const importNodes = nodes.filter(n => n.kind === ts.SyntaxKind.ImportDeclaration);

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

}

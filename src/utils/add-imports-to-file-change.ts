import * as ts from 'typescript';
import { insertImport } from "@schematics/angular/utility/ast-utils";

export function addImportsToFileChange(sourceText: string, context: any): any {
  let sourceFile = ts.createSourceFile(context.path, sourceText, ts.ScriptTarget.Latest, true);

  const changesArr = []

  changesArr.push(insertImport(sourceFile, context.path, 'ConfigModule', '@nestjs/config'))
  changesArr.push(insertImport(sourceFile, context.path, 'config, { validate }', './config/configuration', true))

  return changesArr
}

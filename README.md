# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Run locally

If you did changes to the schematic, first you need to build it:


```bash
npm run build
```

And then you can tun it locally:

```bash
npm run run:insert-code -- --name=Iñigo --sex=male
```

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

### 🔗 Useful links

- [Schematics official documentation](https://angular.io/guide/schematics)
- [Update and insert auto-generated code to existing Typescript, HTML and JSON files with Angular schematics Pt.1](https://medium.com/humanitec-developers/update-and-insert-auto-generated-code-to-existing-typescript-html-and-json-files-with-angular-f0b00f22fb52)
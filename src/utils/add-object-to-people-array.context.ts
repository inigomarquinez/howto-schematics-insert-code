export class AddObjectToPeopleArrayContext {
  path: string; // path of the file we want to modify
  name: string;
  sex: string;
}

export function createAddObjectToPeopleArrayContext(options: any): AddObjectToPeopleArrayContext {
  console.log('options :>> ', options);
  let path = './demoFiles/people.ts';
  let name = options.name || "Default name";
  let sex = options.sex || "Default sex";

  return {
    path,
    name,
    sex
  }
}
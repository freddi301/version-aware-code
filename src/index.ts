export type Api = {
  getPerson(id: string): Person;
  addPerson(person: Person): void;
  getPeople(): Person[];
};

export type Person = { id: string; name: string; age: number };

export const api: Api = {
  getPerson(id: string): Person {
    return { id, name: "John Doe", age: 23 };
  },
  addPerson(person: Person): void {
    return void person;
  },
  getPeople(): Person[] {
    return []
  }
};

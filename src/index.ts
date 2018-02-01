export type Api = {
  getPerson(id: string): Person;
  addPerson(person: Person): void;
  getPeople(): Person[];
};

export type Person = { id: string; name: string; birth: Date; gender: string };

export const api: Api = {
  getPerson(id: string): Person {
    return people.get(id) as Person;
  },
  addPerson(person: Person): void {
    return void people.set(person.id, person);
  },
  getPeople(): Person[] {
    return Array.from(people.values());
  }
};

const people: Map<String, Person> = new Map();

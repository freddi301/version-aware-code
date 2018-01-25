# Version Aware Code

**goal**: effortless (less-effort) migration between software versions

**why you need it**: "Move fast, don't break things"

**scenarios**:

* enforce that you api remain always retrocompatible
* safe data migration
* hotreload code keeping in memory data

First step, we declare the contract our program will have with external world.

`index.js`

```typescript
export type Api = {
  getPerson(id: string): Person;
  addPerson(person: Person): void;
};

export type Person = { id: string; name: string; age: number };

export const api: Api = {
  getPerson(id: string): Person {
    return { id, name: "John Doe", age: 23 };
  },
  addPerson(person: Person): void {
    return void person;
  }
};
```

We gonna respect [semver](https://semver.org/)

So we tag this commit as `v1.0.0`

## Running the example

install:

* [Node.js](https://github.com/creationix/nvm)
* [Visual Studio Code](https://code.visualstudio.com/)
* [git](https://git-scm.com/)
* [git-fs](https://github.com/freddi301/git-fs)

do:

1. `git clone https://github.com/freddi301/version-aware-code.git`
2. `cd version-aware-code`
3. `npm install`
4. open the folder with **Visual Studio Code**
5. read the `README.md`

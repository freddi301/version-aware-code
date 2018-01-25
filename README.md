# Version Aware Code

**goal**: effortless (less-effort) migration between software versions

**why you need it**: "Move fast, don't break things"

**scenarios**:

* enforce that you api remain always retrocompatible
* safe data migration
* hotreload code keeping in memory data

First step, we declare the contract our program will have with external world.

`src/index.js`

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

We gonna respect [semver](https://semver.org/).

So we tag this commit as `v1.0.0`.

Let's add a new capability to our API.

```typescript
export type Api = {
  getPerson(id: string): Person;
  addPerson(person: Person): void;
  getPeople(): Person[];
};
```

Resulting in a [MINOR](https://semver.org/#spec-item-7) change.

Let's leverage the typechecker to check if our api is retrocompatible.

`src/test/compatibility.test.ts`

```typescript
import { Api as PREVIOUS_Api } from "../../.git/fs/HEAD/worktree/src";
import { Api as CURRENT_Api } from "../../src";

test("retro-compatibility", () => {
  let current: CURRENT_Api = null as any;
  let previous: PREVIOUS_Api = null as any;

  // this means we can safely replace the previous api with the new one
  previous = current;

  // but we can't downgrade the current api to the previous one
  // uncomment next line and see why
  // current = previous
});
```

In this example we are using [git](https://git-scm.com/) for versioning,

[git-fs](https://github.com/freddi301/git-fs) for exposing our whole code history,

[TypeScript](https://www.typescriptlang.org/) for type-checking,

and a [git pre-commit hook](https://git-scm.com/book/it/v2/Customizing-Git-Git-Hooks#_committing_workflow_hooks) that checks for us if we introduce breaking changes before committing.

The `src/test/compatibility.test.ts` file can be left unchanged till we code PATCH or MINOR changes.

Let's break the api and see how the compiler can be useful detecting the incompatibilities.

```typescript
export type Person = { id: string; name: string; birth: Date };
```

```text
src/test/compatibility.test.ts(10,3): error TS90010: Type 'Api' is not assignable to type 'Api'. Two different types with this name exist, but they are unrelated.
  Types of property 'getPerson' are incompatible.
    Type '(id: string) => Person' is not assignable to type '(id: string) => Person'. Two different types with this name exist, but they are unrelated.
      Type 'Person' is not assignable to type 'Person'. Two different types with this name exist, but they are unrelated.
        Property 'age' is missing in type 'Person'.
```

But let's say we are aware of the fact that we are breaking retro-compatibility,

so let's commit skipping the checks `git commit --no-verify`

and bump the MAJOR version `git tag v2.0.0`.

But we need to migrate our data from our old version.

`src/index.version.adapter.ts`

```typescript
import { Person as Person_V_1_1_0 } from "../.git/fs/tags/v1.1.0/worktree/src";
import { Person as Person_V_2_0_0 } from "../.git/fs/tags/v2.0.0/worktree/src";

export const adapters = {
  from: {
    Person_V_1_1_0: {
      to: {
        Person_V_2_0_0: ({ id, name, age }: Person_V_1_1_0): Person_V_2_0_0 => {
          const now = new Date();
          const birth = new Date(String(now.getFullYear() - age));
          return { id, name, birth };
        }
      }
    }
  }
};
```

```typescript
import { api as api_V_1_1_0 } from "../.git/fs/tags/v1.1.0/worktree/src";
import { api } from "../src";
import { adapt } from "../src/index.version.adapter";

test("migration", () => {
  api_V_1_1_0
    .getPeople()
    .map(adapt.from.Person_V_1_1_0.to.Person_V_2_0_0)
    .forEach(api.addPerson);
});
```

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

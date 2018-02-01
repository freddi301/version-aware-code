import { Api as Api_V_2_0_0 } from "../.git/fs/tags/v2.0.0/worktree/src";
import { Api as Api_V_2_0_1 } from "../.git/fs/tags/v2.0.1/worktree/src";

import { entryPoint } from "../src/entry-point";

test("hot reloading code with data migration", async () => {
  await entryPoint.upgrade("v2.0.0");
  (entryPoint.api as Api_V_2_0_0).addPerson({
    id: "1",
    name: "John",
    birth: new Date("1990")
  });
  expect((entryPoint.api as Api_V_2_0_0).getPeople()).toEqual([
    { id: "1", name: "John", birth: new Date("1990") }
  ]);
  await entryPoint.upgrade("v2.0.1");
  expect((entryPoint.api as Api_V_2_0_1).getPeople()).toEqual([
    { id: "1", name: "John", birth: new Date("1990"), gender: "unknown" }
  ]);
  (entryPoint.api as Api_V_2_0_1).addPerson({
    id: "2",
    name: "Epoch",
    birth: new Date(0),
    gender: "abstract"
  });
  expect((entryPoint.api as Api_V_2_0_1).getPeople()).toEqual([
    { id: "1", name: "John", birth: new Date("1990"), gender: "unknown" },
    { id: "2", name: "Epoch", birth: new Date(0), gender: "abstract" }
  ]);
});

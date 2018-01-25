import { api as api_V_1_1_0 } from "../.git/fs/tags/v1.1.0/worktree/src";
import { api } from "../src";
import { adapt } from "../src/index.version.adapter";

test("migration", () => {
  api_V_1_1_0
    .getPeople()
    .map(adapt.from.Person_V_1_1_0.to.Person_V_2_0_0)
    .forEach(api.addPerson);
});

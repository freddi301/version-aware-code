import { Api as Api_V_2_0_0 } from "../.git/fs/tags/v2.0.0/worktree/src";
import { Api as Api_V_2_0_1 } from "../.git/fs/tags/v2.0.1/worktree/src";
import { adapt } from "../src/index.version.adapter";

export const migrate = {
  from: {
    "": {
      to: {
        "v2.0.0"(fromApi: null, toApi: Api_V_2_0_0){},
        "v2.0.1"(fromApi: null, toApi: Api_V_2_0_1){}
      }
    },
    "v2.0.0": {
      to: {
        "v2.0.1"(fromApi: Api_V_2_0_0, toApi: Api_V_2_0_1) {
          fromApi
            .getPeople()
            .map(adapt.from.Person_V_2_0_0.to.Person_V_2_0_1) // try to comment this line
            .forEach(toApi.addPerson);
        }
      }
    }
  }
};

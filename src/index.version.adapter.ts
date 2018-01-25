import { Person as Person_V_1_1_0 } from "../.git/fs/tags/v1.1.0/worktree/src";
import { Person as Person_V_2_0_0 } from "../.git/fs/tags/v2.0.0/worktree/src";

export const adapt = {
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

import { migrate } from "./index.version.migration";

export const entryPoint = {
  api: null as any,
  version: "" as string,
  async upgrade(nextVersion: string) {
    const nextApi = (await import(`../.git/fs/tags/${nextVersion}/worktree/src`)).api;
    (migrate as any).from[this.version].to[nextVersion](this.api, nextApi);
    this.version = nextVersion;
    this.api = nextApi;
  }
};

import { Api as PREVIOUS_Api } from '../.git/fs/HEAD/worktree/src'
import { Api as CURRENT_Api} from '../src'

test("retro-compatibility", () => {

  let current: CURRENT_Api = null as any;
  let previous: PREVIOUS_Api = null as any;

  // this means we can safely replace the previous api with the new one
  previous = current

  // but we can't downgrade the current api to the previous one
  // uncomment next line and see why
  // current = previous
  
})
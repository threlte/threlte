import type { Instructions } from '../../Instructions'
import IBC from './InstructionsBasic.svelte'

export class InstructionsBasic implements Instructions<typeof IBC> {
  constructor(
    private readonly message: string,
    public readonly style: Instructions['style'] = undefined
  ) {}

  get content() {
    return {
      component: IBC,
      props: {
        message: this.message
      }
    }
  }
}

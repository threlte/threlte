import type { Instructions } from './Instructions'

export class InstructionsBasic implements Instructions {
  constructor(
    public readonly message: string,
    public readonly style: Instructions['style'] = undefined
  ) {}
}

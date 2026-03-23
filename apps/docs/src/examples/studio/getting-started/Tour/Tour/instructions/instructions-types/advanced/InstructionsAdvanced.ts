import type { Instructions } from '../../Instructions'

export class InstructionsAdvanced implements Instructions {
  constructor(
    public readonly content: Instructions['content'],
    public readonly style: Instructions['style'] = undefined
  ) {}
}

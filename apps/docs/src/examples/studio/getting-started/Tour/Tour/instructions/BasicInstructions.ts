import type { Instructions } from './Instructions'

export class BasicInstructions implements Instructions {
  constructor(public readonly messages: string[]) {}
}

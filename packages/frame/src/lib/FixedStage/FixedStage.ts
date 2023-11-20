import { FixedLoop } from '../FixedLoop/FixedLoop'

export class FixedStage {
  constructor(rate: number) {
    const loop = new FixedLoop(rate)
  }
}

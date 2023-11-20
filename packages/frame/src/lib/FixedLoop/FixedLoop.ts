import { Loop } from '../Loop/Loop'

export class FixedLoop extends Loop {
  rate: number
  fixedStepTimeAccumulator: number = 0

  constructor(rate: number) {
    super()
    this.rate = rate
  }

  run(delta: number, args: any[]) {
    this.fixedStepTimeAccumulator += delta

    while (this.fixedStepTimeAccumulator >= this.rate) {
      this.fixedStepTimeAccumulator -= this.rate
      super.run(...args)
    }
  }
}

import { DAG } from './DAG'
import { Loop } from './Loop'

/**
 * A Runner is responsible for running loops. It runs the loops in a
 * requestAnimationFrame loop.
 */
export class Runner extends DAG<Loop> {
  animationFrameHandle?: number
  lastTime = 0

  constructor() {
    super()
  }

  public addLoop = this.add.bind(this)
  public removeLoop = this.remove.bind(this)

  start() {
    this.animationFrameHandle = window.requestAnimationFrame(this.runLoops.bind(this))
  }

  stop() {
    if (this.animationFrameHandle) window.cancelAnimationFrame(this.animationFrameHandle)
  }

  runLoops(time: DOMHighResTimeStamp) {
    const delta = time - this.lastTime
    this.sorted.forEach((loop) => {
      loop.runStages(delta)
    })
    this.lastTime = time
    this.animationFrameHandle = window.requestAnimationFrame(this.runLoops.bind(this))
  }
}

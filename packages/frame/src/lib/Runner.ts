import { DAG } from './DAG'
import { Loop } from './Loop'

/**
 * A Runner is responsible for running loops. It runs the loops in a
 * requestAnimationFrame loop.
 */
export class Runner<RunnerContext extends {}> extends DAG<Loop<RunnerContext>> {
  private animationFrameHandle?: number
  private lastTime = 0

  private context: RunnerContext = {} as RunnerContext

  constructor(context?: RunnerContext) {
    super()
    if (context) this.context = context
  }

  public createLoop(
    callback?: ConstructorParameters<typeof Loop>[0],
    options?: Parameters<Runner<RunnerContext>['add']>[1]
  ) {
    const loop = new Loop<RunnerContext>(callback)
    this.add(loop, options)
    return loop
  }

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
      loop.runStages(this.context, delta)
    })
    this.lastTime = time
    this.animationFrameHandle = window.requestAnimationFrame(this.runLoops.bind(this))
  }
}

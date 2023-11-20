import { DAG, type AddNodeOptions } from './DAG'
import { Loop } from './Loop'
import type { AnyContext, DefinedContext } from './types'

/**
 * A Runner is responsible for running loops. It runs the loops in a
 * requestAnimationFrame loop.
 */
export class Runner<RunnerContext extends AnyContext> extends DAG<Loop<RunnerContext, any>> {
  private animationFrameHandle?: number
  private lastTime = 0

  private context?: RunnerContext

  private constructor(context?: RunnerContext) {
    super()
    if (context) this.context = context
  }

  public static create(): Runner<undefined>
  public static create<RunnerContext extends DefinedContext>(options: {
    context: RunnerContext
  }): Runner<RunnerContext>
  public static create<RunnerContext extends DefinedContext>(options?: {
    context?: RunnerContext
  }) {
    if (options?.context) {
      return new Runner<RunnerContext>(options?.context)
    } else {
      return new Runner<undefined>()
    }
  }

  public createLoop(options?: {
    callback?: (delta: number, run: (deltaOverride?: number) => void) => void
    options?: AddNodeOptions<Loop<RunnerContext, any>>
  }): Loop<RunnerContext, undefined>
  public createLoop<LoopContext extends DefinedContext>(options?: {
    context: LoopContext
    callback?: (delta: number, run: (deltaOverride?: number) => void) => void
    options?: AddNodeOptions<Loop<RunnerContext, LoopContext>>
  }): Loop<RunnerContext, LoopContext>
  public createLoop<LoopContext extends DefinedContext>(options?: {
    context: LoopContext
    callback?: (delta: number, run: (deltaOverride?: number) => void) => void
    options?: AddNodeOptions<Loop<RunnerContext, LoopContext>>
  }) {
    if (options?.context) {
      const loop = new Loop<RunnerContext, LoopContext>(options.context, options.callback)
      this.add(loop, options.options)
      return loop as Loop<RunnerContext, LoopContext>
    } else {
      const loop = new Loop<RunnerContext, LoopContext>(options?.context, options?.callback)
      this.add(loop, options?.options)
      return loop as any as Loop<RunnerContext, undefined>
    }
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
      loop.runStages(delta, this.context)
    })
    this.lastTime = time
    this.animationFrameHandle = window.requestAnimationFrame(this.runLoops.bind(this))
  }
}

import { DAG, type AddNodeOptions } from './DAG'
import { Loop } from './Loop'
import type { AnyContext, DefinedContext } from './types'

/**
 * A Scheduler is responsible for running loops. It runs the loops in a
 * requestAnimationFrame loop.
 */
export class Scheduler<SchedulerContext extends AnyContext> extends DAG<
  Loop<SchedulerContext, any>
> {
  private animationFrameHandle?: number
  private lastTime = 0

  private context: SchedulerContext = undefined as SchedulerContext

  private constructor(context?: SchedulerContext) {
    super()
    if (context) this.context = context
  }

  public static create(): Scheduler<undefined>
  public static create<SchedulerContext extends DefinedContext>(options: {
    context: SchedulerContext
  }): Scheduler<SchedulerContext>
  public static create<SchedulerContext extends DefinedContext>(options?: {
    context?: SchedulerContext
  }) {
    if (options?.context) {
      return new Scheduler<SchedulerContext>(options?.context)
    } else {
      return new Scheduler<undefined>()
    }
  }

  public createLoop(
    options?: {
      callback?: (delta: number, run: (deltaOverride?: number) => void) => void
    } & AddNodeOptions<Loop<SchedulerContext, any>> & {
        label?: string
      }
  ): Loop<SchedulerContext, undefined>
  public createLoop<LoopContext extends DefinedContext>(
    options?: {
      context: LoopContext
      callback?: (delta: number, run: (deltaOverride?: number) => void) => void
    } & AddNodeOptions<Loop<SchedulerContext, any>> & {
        label?: string
      }
  ): Loop<SchedulerContext, LoopContext>
  public createLoop<LoopContext extends DefinedContext>(
    options?: {
      context: LoopContext
      callback?: (delta: number, run: (deltaOverride?: number) => void) => void
    } & AddNodeOptions<Loop<SchedulerContext, any>> & {
        label?: string
      }
  ) {
    if (options?.context) {
      const loop = new Loop<SchedulerContext, LoopContext>(
        options.context,
        options.callback,
        options.label
      )
      this.add(loop, {
        after: options.after,
        before: options.before
      })
      return loop as Loop<SchedulerContext, LoopContext>
    } else {
      const loop = new Loop<SchedulerContext, LoopContext>(
        options?.context,
        options?.callback,
        options?.label
      )
      this.add(loop, {
        after: options?.after,
        before: options?.before
      })
      return loop as any as Loop<SchedulerContext, undefined>
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

  get executionPlan() {
    return this.sorted
      .map((loop) => {
        return `(${loop.label ?? 'Unnamed Loop'} [${loop.executionPlan}])`
      })
      .flat()
      .join(' → ')
  }
}

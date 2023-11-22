import { DAG, type AddNodeOptions } from './DAG'
import { Loop } from './Loop'
import type { AnyContext, DefinedContext } from './types'

export type Schedule = ReturnType<Scheduler<any>['getSchedule']>

/**
 * A Scheduler is responsible for running loops. It runs the loops in a
 * requestAnimationFrame loop.
 */
export class Scheduler<SchedulerContext extends AnyContext> extends DAG<
  Loop<SchedulerContext, any>
> {
  private animationFrameHandle?: number
  private lastTime = performance.now()
  private clampDeltaTo = 0.1

  private context: SchedulerContext = undefined as SchedulerContext

  private constructor(context?: SchedulerContext, options?: { clampDeltaTo?: number }) {
    super()
    if (context) this.context = context
    if (options?.clampDeltaTo) this.clampDeltaTo = options.clampDeltaTo
    this.run = this.run.bind(this)
  }

  public static create(options?: { clampDeltaTo?: number }): Scheduler<undefined>
  public static create<SchedulerContext extends DefinedContext>(
    options: {
      context: SchedulerContext
    } & {
      clampDeltaTo?: number
    }
  ): Scheduler<SchedulerContext>
  public static create<SchedulerContext extends DefinedContext>(
    options?: {
      context?: SchedulerContext
    } & {
      clampDeltaTo?: number
    }
  ) {
    if (options?.context) {
      return new Scheduler<SchedulerContext>(options?.context, {
        clampDeltaTo: options?.clampDeltaTo
      })
    } else {
      return new Scheduler<undefined>(undefined, {
        clampDeltaTo: options?.clampDeltaTo
      })
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
        this,
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
        this,
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

  run(time: DOMHighResTimeStamp) {
    const delta = time - this.lastTime
    this.sorted.forEach((loop) => {
      // we pass the delta as seconds, not milliseconds,
      // this is in line with how Three.js, Unity and
      // other game engines do it. On top of that, it
      // needs to be clamped to prevent large delta
      // values from causing large jumps in the game
      // state.
      loop.runStages(Math.min(delta / 1000, this.clampDeltaTo), this.context)
    })
    this.lastTime = time
  }

  public getSchedule(
    include: {
      stages?: boolean
      tasks?: boolean
    } = {
      stages: true,
      tasks: true
    }
  ) {
    return {
      loops: this.sorted.map((loop) => {
        return {
          label: loop.label ?? 'Unnamed Loop',
          ...{ stages: include.stages ? loop.getSchedule(include.tasks) : undefined }
        }
      })
    }
  }
}

import { DAG, type AddNodeOptions } from './DAG'
import { Stage } from './Stage'
import type { AnyContext, DefinedContext } from './types'

export type Schedule = ReturnType<Scheduler<any>['getSchedule']>

export type CreateStageOptions<
  SchedulerContext extends AnyContext,
  StageContext extends AnyContext
> =
  | ({
      callback?: (
        delta: number,
        runTasks: (deltaOverride?: number) => void,
        schedulerContext: SchedulerContext
      ) => void
    } & AddNodeOptions<Stage<SchedulerContext, any>> & {
        label?: string
      })
  | ({
      context: StageContext
      callback?: (
        delta: number,
        runTasks: (deltaOverride?: number) => void,
        schedulerContext: SchedulerContext
      ) => void
    } & AddNodeOptions<Stage<SchedulerContext, any>> & {
        label?: string
      })

/**
 * A Scheduler is responsible for running stages. It runs the stages in a
 * requestAnimationFrame stage.
 */
export class Scheduler<SchedulerContext extends AnyContext> extends DAG<
  Stage<SchedulerContext, any>
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

  public createStage(
    options?: {
      callback?: (
        delta: number,
        runTasks: (deltaOverride?: number) => void,
        schedulerContext: SchedulerContext
      ) => void
    } & AddNodeOptions<Stage<SchedulerContext, any>> & {
        label?: string
      }
  ): Stage<SchedulerContext, undefined>
  public createStage<StageContext extends DefinedContext>(
    options?: {
      context: StageContext
      callback?: (
        delta: number,
        runTasks: (deltaOverride?: number) => void,
        schedulerContext: SchedulerContext
      ) => void
    } & AddNodeOptions<Stage<SchedulerContext, any>> & {
        label?: string
      }
  ): Stage<SchedulerContext, StageContext>
  public createStage<StageContext extends DefinedContext>(
    options?: {
      context: StageContext
      callback?: (
        delta: number,
        runTasks: (deltaOverride?: number) => void,
        schedulerContext: SchedulerContext
      ) => void
    } & AddNodeOptions<Stage<SchedulerContext, any>> & {
        label?: string
      }
  ) {
    if (options?.context) {
      const stage = new Stage<SchedulerContext, StageContext>(
        this,
        options.context,
        options.callback,
        options.label
      )
      this.add(stage, {
        after: options.after,
        before: options.before
      })
      return stage as Stage<SchedulerContext, StageContext>
    } else {
      const stage = new Stage<SchedulerContext, StageContext>(
        this,
        options?.context,
        options?.callback,
        options?.label
      )
      this.add(stage, {
        after: options?.after,
        before: options?.before
      })
      return stage as any as Stage<SchedulerContext, undefined>
    }
  }

  public removeStage = this.remove.bind(this)

  run(time: DOMHighResTimeStamp) {
    const delta = time - this.lastTime
    this.forEachNode((stage) => {
      // we pass the delta as seconds, not milliseconds,
      // this is in line with how Three.js, Unity and
      // other game engines do it. On top of that, it
      // needs to be clamped to prevent large delta
      // values from causing large jumps in the game
      // state.
      stage.run(Math.min(delta / 1000, this.clampDeltaTo), this.context)
    })
    this.lastTime = time
  }

  public getSchedule(
    include: {
      tasks?: boolean
    } = {
      tasks: true
    }
  ) {
    return {
      stages: this.mapNodes((stage) => {
        return {
          label: stage.label ?? 'Unnamed Stage',
          ...{ tasks: include.tasks ? stage.getSchedule() : undefined }
        }
      })
    }
  }

  public printSchedule(
    include: {
      tasks?: boolean
    } = {
      tasks: true
    }
  ) {
    console.log(JSON.stringify(this.getSchedule(include), null, 2))
  }
}

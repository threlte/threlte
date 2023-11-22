import { DAG, type AddNodeOptions } from './DAG'
import type { Scheduler } from './Scheduler'
import { Stage } from './Stage'
import type { AnyContext, DefinedContext } from './types'

/**
 * A Loop is a collection of stages. The stages are run in a topological sort
 * order.
 */
export class Loop<SchedulerContext extends AnyContext, LoopContext extends AnyContext> extends DAG<
  Stage<SchedulerContext, LoopContext, any>
> {
  private callback: (delta: number, run: (deltaOverride?: number) => void) => void = (_, r) => r()
  private context: LoopContext = undefined as LoopContext

  public scheduler: Scheduler<SchedulerContext>
  public label?: string

  constructor(
    scheduler: Scheduler<SchedulerContext>,
    context?: LoopContext,
    callback?: (delta: number, run: (deltaOverride?: number) => void) => void,
    label?: string
  ) {
    super()
    this.scheduler = scheduler
    if (context) this.context = context
    if (callback) this.callback = callback.bind(this)
    if (label) this.label = label
  }

  public createStage<StageContext extends DefinedContext>(
    options: {
      context: StageContext
    } & AddNodeOptions<Stage<SchedulerContext, LoopContext, any>> & {
        label?: string
      }
  ): Stage<SchedulerContext, LoopContext, StageContext>
  public createStage(
    options?: AddNodeOptions<Stage<SchedulerContext, LoopContext, any>> & {
      label?: string
    }
  ): Stage<SchedulerContext, LoopContext, undefined>
  public createStage<StageContext extends DefinedContext>(
    options?: {
      context?: StageContext
    } & AddNodeOptions<Stage<SchedulerContext, LoopContext, any>> & {
        label?: string
      }
  ) {
    if (options?.context) {
      const stage = new Stage<SchedulerContext, LoopContext, StageContext>(
        this,
        options.context,
        options.label
      )
      this.add(stage, {
        after: options.after,
        before: options.before
      })
      return stage
    } else {
      const stage = new Stage<SchedulerContext, LoopContext, undefined>(
        this,
        undefined,
        options?.label
      )
      this.add(stage, {
        after: options?.after,
        before: options?.before
      })
      return stage
    }
  }

  public addStage = this.add.bind(this)
  public removeStage = this.remove.bind(this)

  public runStages(delta: number, schedulerContext: SchedulerContext) {
    this.callback(delta, (deltaOverride) =>
      this.sorted.forEach((stage) =>
        stage.run(deltaOverride ?? delta, schedulerContext, this.context)
      )
    )
  }

  public getSchedule(includeTasks = true) {
    return this.sorted.map((stage) => {
      return {
        label: stage.label ?? 'Unnamed Stage',
        ...{ tasks: includeTasks ? stage.getTaskLabels() : undefined }
      }
    })
  }
}

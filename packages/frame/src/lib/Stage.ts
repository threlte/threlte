import { DAG, type AddNodeOptions } from './DAG'
import type { Scheduler } from './Scheduler'
import { Step } from './Step'
import type { AnyContext, DefinedContext } from './types'

/**
 * A Stage is a collection of steps. The steps are run in a topological sort
 * order.
 */
export class Stage<
  SchedulerContext extends AnyContext,
  StageContext extends AnyContext
> extends DAG<Step<SchedulerContext, StageContext, any>> {
  private callback: (
    delta: number,
    runSteps: (deltaOverride?: number) => void,
    schedulerContext: SchedulerContext
  ) => void = (_, r) => r()
  private context: StageContext = undefined as StageContext

  public scheduler: Scheduler<SchedulerContext>
  public label?: string

  constructor(
    scheduler: Scheduler<SchedulerContext>,
    context?: StageContext,
    callback?: (
      delta: number,
      runSteps: (deltaOverride?: number) => void,
      schedulerContext: SchedulerContext
    ) => void,
    label?: string
  ) {
    super()
    this.scheduler = scheduler
    if (context) this.context = context
    if (callback) this.callback = callback.bind(this)
    if (label) this.label = label
  }

  public createStep<StepContext extends DefinedContext>(
    options: {
      context: StepContext
    } & AddNodeOptions<Step<SchedulerContext, StageContext, any>> & {
        label?: string
      }
  ): Step<SchedulerContext, StageContext, StepContext>
  public createStep(
    options?: AddNodeOptions<Step<SchedulerContext, StageContext, any>> & {
      label?: string
    }
  ): Step<SchedulerContext, StageContext, undefined>
  public createStep<StepContext extends DefinedContext>(
    options?: {
      context?: StepContext
    } & AddNodeOptions<Step<SchedulerContext, StageContext, any>> & {
        label?: string
      }
  ) {
    if (options?.context) {
      const step = new Step<SchedulerContext, StageContext, StepContext>(
        this,
        options.context,
        options.label
      )
      this.add(step, {
        after: options.after,
        before: options.before
      })
      return step
    } else {
      const step = new Step<SchedulerContext, StageContext, undefined>(
        this,
        undefined,
        options?.label
      )
      this.add(step, {
        after: options?.after,
        before: options?.before
      })
      return step
    }
  }

  public addStep = this.add.bind(this)
  public removeStep = this.remove.bind(this)

  public runSteps(delta: number, schedulerContext: SchedulerContext) {
    this.callback(
      delta,
      (deltaOverride) => {
        this.sorted.forEach((step) =>
          step.run(deltaOverride ?? delta, schedulerContext, this.context)
        )
      },
      schedulerContext
    )
  }

  public getSchedule(includeTasks = true) {
    return this.sorted.map((step) => {
      return {
        label: step.label ?? 'Unnamed Step',
        ...{ tasks: includeTasks ? step.getTaskLabels() : undefined }
      }
    })
  }
}

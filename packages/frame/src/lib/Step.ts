import type { Stage } from './Stage'
import type { AnyContext } from './types'

export type Task<
  SchedulerContext extends AnyContext,
  StageContext extends AnyContext,
  StepContext extends AnyContext
> = (
  delta: number,
  schedulerContext: SchedulerContext,
  stageContext: StageContext,
  stepContext: StepContext
) => void

/**
 * A Step is a step in a stage. It can have tasks that are run when the
 * stage is run. The tasks of a step are run in an arbitrary order.
 */
export class Step<
  SchedulerContext extends AnyContext,
  StageContext extends AnyContext,
  StepContext extends AnyContext
> {
  private tasks: Set<Task<SchedulerContext, StageContext, StepContext>> = new Set()
  private context: StepContext = undefined as StepContext
  private taskLabels: Map<Task<SchedulerContext, StageContext, StepContext>, string> = new Map()

  public stage: Stage<SchedulerContext, StageContext>
  public label?: string

  constructor(stage: Stage<SchedulerContext, StageContext>, context?: StepContext, label?: string) {
    this.stage = stage
    if (context) this.context = context
    this.label = label
  }

  public createTask(
    task: Task<SchedulerContext, StageContext, StepContext>,
    options?: { label?: string }
  ) {
    this.tasks.add(task)
    if (options?.label) this.taskLabels.set(task, options.label)
  }

  public removeTask(task: Task<SchedulerContext, StageContext, StepContext>) {
    this.tasks.delete(task)
    this.taskLabels.delete(task)
  }

  run(delta: number, schedulerContext: SchedulerContext, stageContext: StageContext) {
    this.tasks.forEach((task) => {
      task(delta, schedulerContext, stageContext, this.context)
    })
  }

  public getTaskLabels() {
    return Array.from(this.tasks).map((task) => this.taskLabels.get(task) || 'Unnamed Task')
  }
}

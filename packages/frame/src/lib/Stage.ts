import type { AnyContext } from './types'

type Task<
  SchedulerContext extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> = (
  schedulerContext: SchedulerContext,
  loopContext: LoopContext,
  stageContext: StageContext,
  delta: number
) => void

/**
 * A Stage is a stage in a loop. It can have tasks that are run when the
 * loop is run. The tasks of a stage are run in an arbitrary order.
 */
export class Stage<
  SchedulerContext extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> {
  private tasks: Set<Task<SchedulerContext, LoopContext, StageContext>> = new Set()
  private context: StageContext = undefined as StageContext
  public label?: string

  constructor(context?: StageContext, label?: string) {
    if (context) this.context = context
    this.label = label
  }

  public createTask(task: Task<SchedulerContext, LoopContext, StageContext>) {
    this.tasks.add(task)
  }

  public removeTask(task: Task<SchedulerContext, LoopContext, StageContext>) {
    this.tasks.delete(task)
  }

  run(delta: number, schedulerContext: SchedulerContext, loopContext: LoopContext) {
    this.tasks.forEach((task) => {
      task(schedulerContext, loopContext, this.context, delta)
    })
  }
}

import type { Loop } from './Loop'
import type { AnyContext } from './types'

export type Task<
  SchedulerContext extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> = (
  delta: number,
  schedulerContext: SchedulerContext,
  loopContext: LoopContext,
  stageContext: StageContext
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
  private taskLabels: Map<Task<SchedulerContext, LoopContext, StageContext>, string> = new Map()

  public loop: Loop<SchedulerContext, LoopContext>
  public label?: string

  constructor(loop: Loop<SchedulerContext, LoopContext>, context?: StageContext, label?: string) {
    this.loop = loop
    if (context) this.context = context
    this.label = label
  }

  public createTask(
    task: Task<SchedulerContext, LoopContext, StageContext>,
    options?: { label?: string }
  ) {
    this.tasks.add(task)
    if (options?.label) this.taskLabels.set(task, options.label)
  }

  public removeTask(task: Task<SchedulerContext, LoopContext, StageContext>) {
    this.tasks.delete(task)
    this.taskLabels.delete(task)
  }

  run(delta: number, schedulerContext: SchedulerContext, loopContext: LoopContext) {
    this.tasks.forEach((task) => {
      task(delta, schedulerContext, loopContext, this.context)
    })
  }

  public getTaskLabels() {
    return Array.from(this.tasks).map((task) => this.taskLabels.get(task) || 'Unnamed Task')
  }
}

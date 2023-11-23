import { DAG, type AddNodeOptions } from './DAG'
import type { Scheduler } from './Scheduler'
import { Task, type TaskCallback } from './Task'
import type { AnyContext } from './types'

/**
 * A Stage is a collection of steps. The steps are run in a topological sort
 * order.
 */
export class Stage<
  SchedulerContext extends AnyContext,
  StageContext extends AnyContext
> extends DAG<Task<SchedulerContext, StageContext>> {
  private callback: (
    delta: number,
    run: (deltaOverride?: number) => void,
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
      run: (deltaOverride?: number) => void,
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

  public createTask(
    callback: TaskCallback<SchedulerContext, StageContext>,
    options?: AddNodeOptions<Task<SchedulerContext, StageContext>> & { label?: string }
  ): Task<SchedulerContext, StageContext> {
    const task = new Task(this, callback, options?.label)
    this.add(task, options)
    return task
  }

  public removeTask(task: Task<SchedulerContext, StageContext>) {
    this.remove(task)
  }

  public run(delta: number, schedulerContext: SchedulerContext) {
    this.callback(
      delta,
      (deltaOverride) => {
        this.forEachNode((task) => {
          task.run(deltaOverride ?? delta, schedulerContext, this.context)
        })
      },
      schedulerContext
    )
  }

  public getSchedule() {
    return this.mapNodes((task) => task.label)
  }
}

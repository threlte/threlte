import { DAG, type AddNodeOptions } from './DAG'
import type { Scheduler } from './Scheduler'
import type { AnyContext } from './types'

export type Task<SchedulerContext extends AnyContext, StageContext extends AnyContext> = (
  delta: number,
  schedulerContext: SchedulerContext,
  stageContext: StageContext
) => void

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

  private taskLabels: Map<Task<SchedulerContext, StageContext>, string> = new Map()

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

  public addTask(
    task: Task<SchedulerContext, StageContext>,
    options?: AddNodeOptions<Task<SchedulerContext, StageContext>> & { label?: string }
  ): Task<SchedulerContext, StageContext> {
    this.add(task, options)
    if (options?.label) {
      this.taskLabels.set(task, options.label)
    }
    return task
  }

  public removeTask(task: Task<SchedulerContext, StageContext>) {
    this.remove(task)
    this.taskLabels.delete(task)
  }

  public run(delta: number, schedulerContext: SchedulerContext) {
    this.callback(
      delta,
      (deltaOverride) => {
        this.forEachNode((step) => {
          step(deltaOverride ?? delta, schedulerContext, this.context)
        })
      },
      schedulerContext
    )
  }

  public getSchedule() {
    return this.mapNodes((task) => this.taskLabels.get(task) ?? 'Unnamed Task')
  }
}

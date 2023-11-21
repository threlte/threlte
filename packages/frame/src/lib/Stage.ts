import type { AnyContext } from './types'

type Task<
  SchedulerContext extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> = SchedulerContext extends Record<string, any>
  ? LoopContext extends Record<string, any>
    ? StageContext extends Record<string, any>
      ? (
          schedulerCtx: SchedulerContext,
          loopCtx: LoopContext,
          stageCtx: StageContext,
          delta: number
        ) => void
      : (schedulerCtx: SchedulerContext, loopCtx: LoopContext, delta: number) => void
    : StageContext extends Record<string, any>
    ? (schedulerCtx: SchedulerContext, stageCtx: StageContext, delta: number) => void
    : (schedulerCtx: SchedulerContext, delta: number) => void
  : LoopContext extends Record<string, any>
  ? StageContext extends Record<string, any>
    ? (loopCtx: LoopContext, stageCtx: StageContext, delta: number) => void
    : (loopCtx: LoopContext, delta: number) => void
  : StageContext extends Record<string, any>
  ? (stageCtx: StageContext, delta: number) => void
  : (delta: number) => void

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
  private context?: StageContext

  constructor(context?: StageContext) {
    this.context = context
  }

  public createTask(task: Task<SchedulerContext, LoopContext, StageContext>) {
    this.tasks.add(task)
  }

  public removeTask(task: Task<SchedulerContext, LoopContext, StageContext>) {
    this.tasks.delete(task)
  }

  run(delta: number, schedulerContext?: SchedulerContext, loopContext?: LoopContext) {
    const contexts = [schedulerContext, loopContext, this.context].filter(
      (c) => c !== undefined
    ) as [SchedulerContext, LoopContext, StageContext]
    this.tasks.forEach((task) => {
      ;(task as any)(...contexts, delta)
    })
  }
}

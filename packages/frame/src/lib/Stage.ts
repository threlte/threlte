import type { AnyContext } from './types'

type Handler<
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
 * A Stage is a stage in a loop. It can have handlers that are run when the
 * loop is run. The handlers of a stage are run in an arbitrary order.
 */
export class Stage<
  SchedulerContext extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> {
  private handlers: Set<Handler<SchedulerContext, LoopContext, StageContext>> = new Set()
  private context?: StageContext

  constructor(context?: StageContext) {
    this.context = context
  }

  public addHandler(handler: Handler<SchedulerContext, LoopContext, StageContext>) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler<SchedulerContext, LoopContext, StageContext>) {
    this.handlers.delete(handler)
  }

  run(delta: number, schedulerContext?: SchedulerContext, loopContext?: LoopContext) {
    const contexts = [schedulerContext, loopContext, this.context].filter(
      (c) => c !== undefined
    ) as [SchedulerContext, LoopContext, StageContext]
    this.handlers.forEach((handler) => {
      ;(handler as any)(...contexts, delta)
    })
  }
}

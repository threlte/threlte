import type { AnyContext } from './types'

type Handler<
  RunnerContext extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> = RunnerContext extends Record<string, any>
  ? LoopContext extends Record<string, any>
    ? StageContext extends Record<string, any>
      ? (
          runnerCtx: RunnerContext,
          loopCtx: LoopContext,
          stageCtx: StageContext,
          delta: number
        ) => void
      : (runnerCtx: RunnerContext, loopCtx: LoopContext, delta: number) => void
    : StageContext extends Record<string, any>
    ? (runnerCtx: RunnerContext, stageCtx: StageContext, delta: number) => void
    : (runnerCtx: RunnerContext, delta: number) => void
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
  RunnerContext extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> {
  private handlers: Set<Handler<RunnerContext, LoopContext, StageContext>> = new Set()
  private context?: StageContext

  constructor(context?: StageContext) {
    this.context = context
  }

  public addHandler(handler: Handler<RunnerContext, LoopContext, StageContext>) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler<RunnerContext, LoopContext, StageContext>) {
    this.handlers.delete(handler)
  }

  run(delta: number, runnerContext?: RunnerContext, loopContext?: LoopContext) {
    const contexts = [runnerContext, loopContext, this.context].filter((c) => c !== undefined) as [
      RunnerContext,
      LoopContext,
      StageContext
    ]
    this.handlers.forEach((handler) => {
      ;(handler as any)(...contexts, delta)
    })
  }
}

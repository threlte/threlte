type Handler<RunnerContext extends {}, LoopContext extends {}, StageContext extends {}> = (
  runnerContext: RunnerContext,
  loopContext: LoopContext,
  stageContext: StageContext,
  delta: number
) => void

/**
 * A Stage is a stage in a loop. It can have handlers that are run when the
 * loop is run. The handlers of a stage are run in an arbitrary order.
 */
export class Stage<RunnerContext extends {}, LoopContext extends {}, StageContext extends {}> {
  private handlers: Set<Handler<RunnerContext, LoopContext, StageContext>> = new Set()
  private context: StageContext = {} as StageContext

  constructor(context?: StageContext) {
    if (context) this.context = context
  }

  public addHandler(handler: Handler<RunnerContext, LoopContext, StageContext>) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler<RunnerContext, LoopContext, StageContext>) {
    this.handlers.delete(handler)
  }

  run(runnerContext: RunnerContext, loopContext: LoopContext, delta: number) {
    this.handlers.forEach((handler) => handler(runnerContext, loopContext, this.context, delta))
  }
}

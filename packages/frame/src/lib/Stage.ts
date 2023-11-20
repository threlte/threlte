type Handler<Context> = (context: Context, delta: number) => void

/**
 * A Stage is a stage in a loop. It can have handlers that are run when the
 * loop is run. The handlers of a stage are run in an arbitrary order.
 */
export class Stage<RunnerContext> {
  private handlers: Set<Handler<RunnerContext>> = new Set()

  constructor() {}

  public addHandler(handler: Handler<RunnerContext>) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler<RunnerContext>) {
    this.handlers.delete(handler)
  }

  run(runnerContext: RunnerContext, delta: number) {
    this.handlers.forEach((handler) => handler(runnerContext, delta))
  }
}

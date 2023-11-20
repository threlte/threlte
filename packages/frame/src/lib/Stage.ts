type Handler = (...args: any[]) => void

/**
 * A Stage is a stage in a loop. It can have handlers that are run when the
 * loop is run. The handlers of a stage are run in an arbitrary order.
 */
export class Stage {
  private handlers: Set<Handler> = new Set()

  constructor(handlers?: Handler[]) {
    if (handlers) {
      handlers.forEach((handler) => this.addHandler(handler))
    }
  }

  public addHandler(handler: Handler) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler) {
    this.handlers.delete(handler)
  }

  run(...args: any[]) {
    this.handlers.forEach((handler) => handler(...args))
  }
}

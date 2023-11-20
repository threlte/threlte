import { Loop } from '../Loop/Loop'

export class Stage {
  private handlers: Set<(...args: any[]) => void> = new Set()

  public readonly before: Set<Stage> = new Set()
  public readonly after: Set<Stage> = new Set()

  public lopp?: Loop

  constructor(options?: { before?: Stage; after?: Stage }) {
    let lopp: Loop | undefined
    if (options?.before) {
      options.before.before.add(this)
      this.after.add(options.before)
      lopp = options.before.lopp
    }
    if (options?.after) {
      options.after.after.add(this)
      this.before.add(options.after)
      lopp = options.after.lopp
    }
    if (lopp) {
      this.lopp = lopp
      this.lopp.addStage(this)
    }
  }

  public addHandler(handler: (...args: any[]) => void) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: (...args: any[]) => void) {
    this.handlers.delete(handler)
  }

  runHandlers(...args: any[]) {
    this.handlers.forEach((handler) => handler(...args))
  }
}

import type { AnyContext } from './types'

type Handler<StageContext extends AnyContext> = StageContext extends Record<string, any>
  ? (context: StageContext, delta: number) => void
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
  private handlers: Set<Handler<StageContext>> = new Set()
  private context: StageContext | undefined

  constructor(context?: StageContext) {
    this.context = context
  }

  public addHandler(handler: Handler<StageContext>) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler<StageContext>) {
    this.handlers.delete(handler)
  }

  run(runnerContext: RunnerContext, loopContext: LoopContext, delta: number) {
    this.handlers.forEach((handler) => {
      // Check if context is defined
      if (this.context) {
        // If context is defined, call the handler with context and delta
        ;(handler as (context: StageContext, delta: number) => void)(this.context, delta)
      } else {
        // If context is not defined, call the handler with only delta
        ;(handler as (delta: number) => void)(delta)
      }
    })
  }
}

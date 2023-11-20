import { Stage } from './Stage'
import { DAG } from './DAG'

/**
 * A Loop is a collection of stages. The stages are run in a topological sort
 * order.
 */
export class Loop<RunnerContext> extends DAG<Stage<RunnerContext>> {
  private callback: (delta: number, run: (deltaOverride?: number) => void) => void = (_, r) => r()

  constructor(callback?: (delta: number, run: (deltaOverride?: number) => void) => void) {
    super()
    if (callback) this.callback = callback.bind(this)
  }

  public createStage(options?: Parameters<Loop<RunnerContext>['add']>[1]) {
    const stage = new Stage<RunnerContext>()
    this.add(stage, options)
    return stage
  }

  public addStage = this.add.bind(this)
  public removeStage = this.remove.bind(this)

  public runStages(runnerContext: RunnerContext, delta: number) {
    this.callback(delta, (deltaOverride) =>
      this.sorted.forEach((stage) => stage.run(runnerContext, deltaOverride ?? delta))
    )
  }
}

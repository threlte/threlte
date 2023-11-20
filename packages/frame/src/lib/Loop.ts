import { Stage } from './Stage'
import { DAG } from './DAG'

/**
 * A Loop is a collection of stages. The stages are run in a topological sort
 * order.
 */
export class Loop<RunnerContext extends {}, LoopContext extends {}> extends DAG<
  Stage<RunnerContext, LoopContext, any>
> {
  private callback: (delta: number, run: (deltaOverride?: number) => void) => void = (_, r) => r()
  private context: LoopContext = {} as LoopContext

  constructor(
    context?: LoopContext,
    callback?: (delta: number, run: (deltaOverride?: number) => void) => void
  ) {
    super()
    if (context) this.context = context
    if (callback) this.callback = callback.bind(this)
  }

  public createStage<StageContext extends {}>(
    stageContext?: StageContext,
    options?: Parameters<Loop<RunnerContext, LoopContext>['add']>[1]
  ) {
    const stage = new Stage<RunnerContext, LoopContext, StageContext>(stageContext)
    this.add(stage, options)
    return stage
  }

  public addStage = this.add.bind(this)
  public removeStage = this.remove.bind(this)

  public runStages(runnerContext: RunnerContext, delta: number) {
    this.callback(delta, (deltaOverride) =>
      this.sorted.forEach((stage) => stage.run(runnerContext, this.context, deltaOverride ?? delta))
    )
  }
}

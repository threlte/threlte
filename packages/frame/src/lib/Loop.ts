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

  public createStage(
    options?: Parameters<Loop<RunnerContext, LoopContext>['add']>[1]
  ): Stage<RunnerContext, LoopContext, undefined>
  public createStage<StageContext extends Record<string, any>>(
    stageContext?: StageContext,
    options?: Parameters<Loop<RunnerContext, LoopContext>['add']>[1]
  ): Stage<RunnerContext, LoopContext, StageContext>
  public createStage<StageContext extends Record<string, any>>(
    stageContextOrOptions?: StageContext | Parameters<Loop<RunnerContext, LoopContext>['add']>[1],
    options?: Parameters<Loop<RunnerContext, LoopContext>['add']>[1]
  ) {
    if (options) {
      // A StageContext is defined
      const context = stageContextOrOptions as StageContext
      const stage = new Stage<RunnerContext, LoopContext, StageContext>(context)
      this.add(stage, options)
      return stage
    } else {
      // A StageContext is not defined
      const options = stageContextOrOptions as Parameters<
        Loop<RunnerContext, LoopContext>['add']
      >[1]
      const stage = new Stage<RunnerContext, LoopContext, undefined>()
      this.add(stage, options)
      return stage
    }
  }

  public addStage = this.add.bind(this)
  public removeStage = this.remove.bind(this)

  public runStages(runnerContext: RunnerContext, delta: number) {
    this.callback(delta, (deltaOverride) =>
      this.sorted.forEach((stage) => stage.run(runnerContext, this.context, deltaOverride ?? delta))
    )
  }
}

import { DAG, type AddNodeOptions } from './DAG'
import { Stage } from './Stage'
import type { AnyContext, DefinedContext } from './types'

/**
 * A Loop is a collection of stages. The stages are run in a topological sort
 * order.
 */
export class Loop<RunnerContext extends AnyContext, LoopContext extends AnyContext> extends DAG<
  Stage<RunnerContext, LoopContext, any>
> {
  private callback: (delta: number, run: (deltaOverride?: number) => void) => void = (_, r) => r()
  private context?: LoopContext

  constructor(
    context?: LoopContext,
    callback?: (delta: number, run: (deltaOverride?: number) => void) => void
  ) {
    super()
    if (context) this.context = context
    if (callback) this.callback = callback.bind(this)
  }

  public createStage(
    options?: AddNodeOptions<Stage<RunnerContext, LoopContext, any>>
  ): Stage<RunnerContext, LoopContext, undefined>
  public createStage<StageContext extends DefinedContext>(
    stageContext?: StageContext,
    options?: AddNodeOptions<Stage<RunnerContext, LoopContext, any>>
  ): Stage<RunnerContext, LoopContext, StageContext>
  public createStage<StageContext extends DefinedContext>(
    stageContextOrOptions?: StageContext | AddNodeOptions<Stage<RunnerContext, LoopContext, any>>,
    options?: AddNodeOptions<Stage<RunnerContext, LoopContext, any>>
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

  public runStages(delta: number, runnerContext?: RunnerContext) {
    this.callback(delta, (deltaOverride) =>
      this.sorted.forEach((stage) => stage.run(deltaOverride ?? delta, runnerContext, this.context))
    )
  }
}

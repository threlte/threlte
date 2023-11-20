import { Stage } from './Stage'
import { DAG } from './DAG'

/**
 * A Loop is a collection of stages. The stages are run in a topological sort
 * order.
 */
export class Loop extends DAG<Stage> {
  private callback: (delta: number, run: () => void) => void

  constructor(callback: (delta: number, run: () => void) => void) {
    super()
    this.callback = callback.bind(this)
  }

  public addStage = this.add.bind(this)
  public removeStage = this.remove.bind(this)

  public runStages(delta: number) {
    this.callback(delta, () => this.sorted.forEach((stage) => stage.run()))
  }
}

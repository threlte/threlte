import type { Stage } from './Stage'
import type { AnyContext } from './types'

export type TaskCallback<SchedulerContext extends AnyContext, StageContext extends AnyContext> = (
  delta: number,
  schedulerContext: SchedulerContext,
  stageContext: StageContext
) => void

export class Task<SchedulerContext extends AnyContext, StageContext extends AnyContext> {
  private callback: TaskCallback<SchedulerContext, StageContext>
  public label: string = 'Unnamed Task'
  private shouldRun: boolean = true
  public stage: Stage<SchedulerContext, StageContext>

  public stop() {
    this.shouldRun = false
  }

  public start() {
    this.shouldRun = true
  }

  constructor(
    stage: Stage<SchedulerContext, StageContext>,
    callback: (
      delta: number,
      schedulerContext: SchedulerContext,
      stageContext: StageContext
    ) => void,
    label?: string
  ) {
    this.stage = stage
    this.callback = callback
    if (label) this.label = label
  }

  public run(delta: number, schedulerContext: SchedulerContext, stageContext: StageContext) {
    if (!this.shouldRun) return
    this.callback(delta, schedulerContext, stageContext)
  }
}

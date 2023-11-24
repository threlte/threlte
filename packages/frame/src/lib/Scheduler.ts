import { DAG, type AddNodeOptions } from './DAG'
import { Stage } from './Stage'

export type Schedule = ReturnType<Scheduler['getSchedule']>

export type CreateStageOptions = {
  callback?: (delta: number, runTasks: (deltaOverride?: number) => void) => void
} & AddNodeOptions

/**
 * A Scheduler is responsible for running stages. It runs the stages in a
 * requestAnimationFrame stage.
 */
export class Scheduler extends DAG<Stage> {
  private lastTime = performance.now()
  private clampDeltaTo = 0.1

  constructor(options?: { clampDeltaTo?: number }) {
    super()
    if (options?.clampDeltaTo) this.clampDeltaTo = options.clampDeltaTo
    this.run = this.run.bind(this)
  }

  public createStage(label: string, options?: CreateStageOptions) {
    const stage = new Stage(options?.callback)
    this.add(label, stage, {
      after: options?.after,
      before: options?.before
    })
    return stage
  }

  public stageByLabel(label: string) {
    return this.getValueByLabel(label)
  }

  public addStage(label: string, stage: Stage, options?: AddNodeOptions): Stage {
    this.add(label, stage, options)
    return stage
  }

  public removeStage = this.remove.bind(this)

  run(time: DOMHighResTimeStamp) {
    const delta = time - this.lastTime
    this.forEachNode((stage) => {
      // we pass the delta as seconds, not milliseconds,
      // this is in line with how Three.js, Unity and
      // other game engines do it. On top of that, it
      // needs to be clamped to prevent large delta
      // values from causing large jumps in the game
      // state.
      stage.run(Math.min(delta / 1000, this.clampDeltaTo))
    })
    this.lastTime = time
  }

  public getSchedule(
    include: {
      tasks?: boolean
    } = {
      tasks: true
    }
  ) {
    return {
      stages: this.mapLabels((stageLabel) => {
        const stage = this.getValueByLabel(stageLabel)
        if (stage === undefined) throw new Error('Stage not found')
        return {
          label: stageLabel,
          ...{ tasks: include.tasks ? stage.getSchedule() : undefined }
        }
      })
    }
  }
}

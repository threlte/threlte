import { Stage } from '../Stage/Stage'

export class Loop {
  private _stages: Set<Stage> = new Set()
  private sorted: Stage[] = []
  constructor() {}

  public addStage(stage: Stage) {
    this._stages.add(stage)
    this.sort()
  }

  public removeStage(stage: Stage) {
    this._stages.delete(stage)
    this.sort()
  }

  private sort() {
    this.sorted = Array.from(this._stages).sort((a, b) => {
      if (a.before.has(b) || b.after.has(a)) return 1
      if (a.after.has(b) || b.before.has(a)) return -1
      return 0
    })
  }

  public run(...args: any[]) {
    this.sorted.forEach((stage) => stage.runHandlers(...args))
  }
}

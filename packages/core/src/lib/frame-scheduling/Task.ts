import type { Key } from './DAG.js'
import type { Stage } from './Stage.js'

export type TaskCallback = (delta: number) => void

export class Task {
  public readonly key: Key
  public readonly stage: Stage

  private callback: TaskCallback
  private runTask = true

  public stop() {
    this.runTask = false
  }

  public start() {
    this.runTask = true
  }

  constructor(stage: Stage, key: Key, callback: (delta: number) => void) {
    this.stage = stage
    this.key = key
    this.callback = callback
  }

  public run(delta: number) {
    if (!this.runTask) return
    this.callback(delta)
  }
}

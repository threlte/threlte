import type { Key } from './DAG'
import type { Stage } from './Stage'

export type TaskCallback = (delta: number) => void

export class Task {
  private callback: TaskCallback
  private shouldRun: boolean = true
  public key: Key
  public readonly stage: Stage

  public stop() {
    this.shouldRun = false
  }

  public start() {
    this.shouldRun = true
  }

  constructor(stage: Stage, key: Key, callback: (delta: number) => void) {
    this.stage = stage
    this.key = key
    this.callback = callback
  }

  public run(delta: number) {
    if (!this.shouldRun) return
    this.callback(delta)
  }
}

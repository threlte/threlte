import type { Key } from './DAG'

export type TaskCallback = (delta: number) => void

export class Task {
  private callback: TaskCallback
  private shouldRun: boolean = true
  public key: Key

  public stop() {
    this.shouldRun = false
  }

  public start() {
    this.shouldRun = true
  }

  constructor(key: Key, callback: (delta: number) => void) {
    this.key = key
    this.callback = callback
  }

  public run(delta: number) {
    if (!this.shouldRun) return
    this.callback(delta)
  }
}

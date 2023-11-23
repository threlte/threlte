export type TaskCallback = (delta: number) => void

export class Task {
  private callback: TaskCallback
  private shouldRun: boolean = true

  public stop() {
    this.shouldRun = false
  }

  public start() {
    this.shouldRun = true
  }

  constructor(callback: (delta: number) => void) {
    this.callback = callback
  }

  public run(delta: number) {
    if (!this.shouldRun) return
    this.callback(delta)
  }
}

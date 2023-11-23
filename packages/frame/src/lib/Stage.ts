import { DAG, type AddNodeOptions } from './DAG'
import { Task, type TaskCallback } from './Task'

export type CreateTaskOptions = {
  label: string
} & AddNodeOptions

/**
 * A Stage is a collection of steps. The steps are run in a topological sort
 * order.
 */
export class Stage extends DAG<Task> {
  private callback: (delta: number, run: (deltaOverride?: number) => void) => void = (_, r) => r()

  constructor(callback?: (delta: number, run: (deltaOverride?: number) => void) => void) {
    super()
    if (callback) this.callback = callback.bind(this)
  }

  public createTask(label: string, callback: TaskCallback, options?: AddNodeOptions): Task {
    const task = new Task(callback)
    this.add(label, task, options)
    return task
  }

  public addTask(label: string, task: Task, options?: AddNodeOptions): Task {
    this.add(label, task, options)
    return task
  }

  public removeTask = this.remove.bind(this)

  public run(delta: number) {
    this.callback(delta, (deltaOverride) => {
      this.forEachNode((task) => {
        task.run(deltaOverride ?? delta)
      })
    })
  }

  public getSchedule() {
    return this.mapLabels((l) => l)
  }
}

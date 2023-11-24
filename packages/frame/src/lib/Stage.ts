import { DAG, type AddNodeOptions, type Key } from './DAG'
import { Task, type TaskCallback } from './Task'

/**
 * A Stage is a collection of steps. The steps are run in a topological sort
 * order.
 */
export class Stage extends DAG<Task> {
  public key: Key

  private callback: (delta: number, run: (deltaOverride?: number) => void) => void = (_, r) => r()

  constructor(key: Key, callback?: (delta: number, run: (deltaOverride?: number) => void) => void) {
    super()
    this.key = key
    if (callback) this.callback = callback.bind(this)
  }

  public createTask(key: Key, callback: TaskCallback, options?: AddNodeOptions<Task>): Task {
    const task = new Task(key, callback)
    this.add(key, task, options)
    return task
  }

  public getTask(key: Key) {
    return this.getValueByKey(key)
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
    return this.mapNodes((l) => l.key.toString())
  }
}

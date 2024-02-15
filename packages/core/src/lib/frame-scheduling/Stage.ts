import { DAG, type AddNodeOptions, type Key } from './DAG'
import type { Scheduler } from './Scheduler'
import { Task, type TaskCallback } from './Task'

/**
 * A Stage is a collection of steps. The steps are run in a topological sort
 * order.
 */
export class Stage extends DAG<Task> {
  public readonly key: Key
  public readonly scheduler: Scheduler

  public get tasks() {
    return this.sortedVertices
  }

  private callback: (delta: number, run: (deltaOverride?: number) => void) => void = (_, r) => r()

  constructor(
    scheduler: Scheduler,
    key: Key,
    callback?: (delta: number, run: (deltaOverride?: number) => void) => void
  ) {
    super()
    this.scheduler = scheduler
    this.key = key
    if (callback) this.callback = callback.bind(this)
  }

  public createTask(key: Key, callback: TaskCallback, options?: AddNodeOptions<Task>): Task {
    const task = new Task(this, key, callback)
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

  runWithTiming(delta: number) {
    const taskTimings: Record<Key, number> = {}
    this.callback(delta, (deltaOverride) => {
      this.forEachNode((task) => {
        const start = performance.now()
        task.run(deltaOverride ?? delta)
        const duration = performance.now() - start
        taskTimings[task.key] = duration
      })
    })
    return taskTimings
  }

  public getSchedule() {
    return this.mapNodes((l) => l.key.toString())
  }
}

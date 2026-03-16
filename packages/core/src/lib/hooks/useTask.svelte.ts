import { readable, toStore, type Readable } from 'svelte/store'
import { useScheduler } from '../context/fragments/scheduler.svelte.js'
import { DAG, type Key, type Stage, type Task } from '../frame-scheduling/index.js'
import { browser } from '../utilities/index.js'

export interface ThrelteUseTask {
  task: Task

  /**
   * @deprecated pass the `running` option to `useTask` instead.
   *
   * To stop the task, set the options.running state variable to false
   *
   * ```ts
   * let running = $state(true)
   *
   * useTask((delta) => {
   *   // do something
   * }, {
   *   running: () => running
   * })
   *
   * running = false
   * ```
   */
  stop: () => void

  /**
   * @deprecated pass the `running` option to `useTask` instead.
   *
   * To start the task, set the options.running state variable to true
   *
   * ```ts
   * let running = $state(false)
   *
   * useTask((delta) => {
   *   // do something
   * }, {
   *   running: () => running
   * })
   *
   * running = true
   * ```
   */
  start: () => void

  started: Readable<boolean>
}

export interface ThrelteUseTaskOptions {
  /**
   * @deprecated pass the `running` option to `useTask` instead.
   *
   * ```ts
   * let running = $state(true)
   *
   * useTask((delta) => {
   *   // do something
   * }, {
   *   running: () => running
   * })
   * ```
   *
   * If false, the task will not be started automatically and must be started
   * by invoking the `start` function. Defaults to true.
   */
  autoStart?: boolean

  /**
   * If false, the task handler will not automatically invalidate the task.
   * This is useful if you want to manually invalidate the task. Defaults to
   * true.
   */
  autoInvalidate?: boolean

  /**
   * The task will be added to the stage after the specified task.
   */
  after?: (Key | Task) | (Key | Task)[]

  /**
   * The task will be added to the stage before the specified task.
   */
  before?: (Key | Task) | (Key | Task)[]

  /**
   * The stage to add the task to. Defaults to the main stage. If a task object
   * is provided to `after` or `before`, the stage of that task will be used.
   */
  stage?: Key | Stage

  /**
   * Provide a function that returns a rune to toggle running this task.
   *
   * ```ts
   * let running = $state(true)
   *
   * useTask((delta) => {
   *   // do something
   * }, {
   *   running: () => running
   * })
   * ```
   */
  running?: () => boolean
}

/**
 * Adds a handler to threltes unified render loop.
 *
 * `start` and `stop` functions are returned and the options allow setting the
 * handler to not start automatically.
 *
 * Use the options `after` and `before` to control the order of execution. Add
 * the task to a specific stage with the option `stage`.
 *
 * @param {(delta: number) => void} fn callback function
 * @param {ThrelteUseTaskOptions} options options
 * @returns {ThrelteUseTask}
 */
export function useTask(
  fn: (delta: number) => void,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask
export function useTask(
  key: Key,
  fn: (delta: number) => void,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask
export function useTask(
  keyOrFn: Key | ((delta: number) => void),
  fnOrOptions?: ((delta: number) => void) | ThrelteUseTaskOptions,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask {
  if (!browser) {
    return {
      task: undefined as any,
      start: () => undefined,
      stop: () => undefined,
      started: readable(false)
    }
  }

  let key: Key
  let fn: (delta: number) => void
  let opts: ThrelteUseTaskOptions | undefined
  if (DAG.isKey(keyOrFn)) {
    key = keyOrFn
    fn = fnOrOptions as (delta: number) => void
    opts = options
  } else {
    key = Symbol('useTask')
    fn = keyOrFn
    opts = fnOrOptions as ThrelteUseTaskOptions | undefined
  }

  const schedulerCtx = useScheduler()
  const autoInvalidate = opts?.autoInvalidate ?? true

  let stage: Stage = schedulerCtx.mainStage

  let running = $derived(opts?.running?.() ?? opts?.autoStart ?? true)

  if (opts) {
    if (opts.stage) {
      if (DAG.isValue(opts.stage)) {
        stage = opts.stage
      } else {
        const maybeStage = schedulerCtx.scheduler.getStage(opts.stage)
        if (!maybeStage) {
          throw new Error(`No stage found with key ${opts.stage.toString()}`)
        }
        stage = maybeStage
      }
    } else if (opts.after) {
      if (Array.isArray(opts.after)) {
        for (let index = 0; index < opts.after.length; index++) {
          const element = opts.after[index]
          if (DAG.isValue(element)) {
            stage = element.stage
            break
          }
        }
      } else if (DAG.isValue(opts.after)) {
        stage = opts.after.stage
      }
    } else if (opts.before) {
      if (Array.isArray(opts.before)) {
        for (let index = 0; index < opts.before.length; index++) {
          const element = opts.before[index]
          if (DAG.isValue(element)) {
            stage = element.stage
            break
          }
        }
      } else if (DAG.isValue(opts.before)) {
        stage = opts.before.stage
      }
    }
  }

  const task = stage.createTask(key, fn, opts)

  $effect.pre(() => {
    if (!running) {
      return
    }

    task.start()

    if (autoInvalidate) {
      schedulerCtx.autoInvalidations.add(fn)
    }

    return () => {
      task.stop()

      if (autoInvalidate) {
        schedulerCtx.autoInvalidations.delete(fn)
      }
    }
  })

  $effect.pre(() => {
    return () => {
      stage.removeTask(key)
    }
  })

  return {
    task,
    start: () => {
      running = true
    },
    stop: () => {
      running = false
    },
    started: toStore(() => running)
  }
}

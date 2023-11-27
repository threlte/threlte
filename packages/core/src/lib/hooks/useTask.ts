import { getContext, onDestroy } from 'svelte'
import { readable, writable, type Readable } from 'svelte/store'
import { DAG, type Key, type Stage, type Task } from '../frame-scheduling'
import { browser } from '../lib/browser'
import type { ThrelteInternalContext } from '../lib/contexts'
import { useThrelte } from './useThrelte'

export type ThrelteUseTask = {
  task: Task
  stop: () => void
  start: () => void
  started: Readable<boolean>
}

export type ThrelteUseTaskOptions = {
  autostart?: boolean
  /**
   * If false, the task handler will not automatically invalidate the task.
   * This is useful if you want to manually invalidate the task. Defaults to
   * true.
   */
  invalidate?: boolean
} & (
  | {
      after?: (Key | Task) | (Key | Task)[]
      before?: (Key | Task) | (Key | Task)[]
    }
  | {
      stage?: Key | Stage
    }
)

/**
 * Adds a handler to threltes unified render loop.∏
 *
 * `start` and `stop` functions are returned and the options allow
 * setting the handler to not start automatically.
 *
 * Use the options `after` and `before` to control the order of execution.
 * Add the task to a specific stage with the option `stage`.
 *
 * @param {(ctx: ThrelteContext, delta: number) => void} fn callback function
 * @param {ThrelteUseTaskOptions} options options
 * @returns {ThrelteUseTask}
 */
export function useTask(
  fn: (delta: number) => void,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask
export function useTask(
  key: string,
  fn: (delta: number) => void,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask
export function useTask(
  keyOrFn: string | ((delta: number) => void),
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
  if (typeof keyOrFn === 'string') {
    key = keyOrFn
    fn = fnOrOptions as (delta: number) => void
    opts = options
  } else {
    key = Symbol('useTask')
    fn = keyOrFn
    opts = fnOrOptions as ThrelteUseTaskOptions | undefined
  }

  const ctx = useThrelte()

  let stage: Stage = ctx.mainStage

  if (opts) {
    if ('stage' in opts && !!opts.stage) {
      if (DAG.isValue(opts.stage)) {
        stage = opts.stage
      } else {
        const maybeStage = ctx.scheduler.getStage(opts.stage)
        if (!maybeStage) {
          throw new Error(`No stage found with key ${opts.stage.toString()}`)
        }
        stage = maybeStage
      }
    } else if ('after' in opts && opts.after) {
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
    } else if ('before' in opts && opts.before) {
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

  const internalCtx = getContext<ThrelteInternalContext>('threlte-internal-context')

  const started = writable(false)

  const task = stage.createTask(key, fn, {
    after: (opts as any).after,
    before: (opts as any).before
  })

  const start = () => {
    started.set(true)
    if (opts?.invalidate ?? true) {
      internalCtx.invalidators.add(fn)
    }
    task.start()
  }

  const stop = () => {
    started.set(true)
    if (opts?.invalidate ?? true) {
      internalCtx.invalidators.delete(fn)
    }
    task.stop()
  }

  if (options?.autostart ?? true) {
    start()
  } else {
    stop()
  }

  onDestroy(() => {
    if (!stage) return
    stage.removeTask(key)
  })

  return {
    task,
    start,
    stop,
    started: {
      subscribe: started.subscribe
    }
  }
}

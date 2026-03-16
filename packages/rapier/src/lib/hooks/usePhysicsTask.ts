import { useTask, type Key, type ThrelteUseTask, type ThrelteUseTaskOptions } from '@threlte/core'
import { useRapier } from './useRapier.js'

const isKey = (value: unknown): value is Key => {
  return typeof value === 'string' || typeof value === 'symbol'
}

/**
 * Adds a handler to the physics simulation. The handler is always executed as
 * part of the simulation stage and before the simulation task.
 *
 * `start` and `stop` functions are returned and the options allow setting the
 * handler to not start automatically.
 *
 * Use the options `after` and `before` to control the order of execution.
 *
 * @param {(delta: number) => void} fn callback function
 * @param {ThrelteUseTaskOptions} options options
 * @returns {ThrelteUseTask}
 */
export function usePhysicsTask(
  fn: (delta: number) => void,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask
export function usePhysicsTask(
  key: Key,
  fn: (delta: number) => void,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask
export function usePhysicsTask(
  keyOrFn: Key | ((delta: number) => void),
  fnOrOptions?: ((delta: number) => void) | ThrelteUseTaskOptions,
  options?: ThrelteUseTaskOptions
): ThrelteUseTask {
  const { simulationTask, simulationStage } = useRapier()

  let key: Key
  let fn: (delta: number) => void
  let opts: ThrelteUseTaskOptions

  if (isKey(keyOrFn)) {
    key = keyOrFn
    fn = fnOrOptions as (delta: number) => void
    opts = options ?? {}
  } else {
    key = Symbol('usePhysicsTask')
    fn = keyOrFn
    opts = (fnOrOptions ?? {}) as ThrelteUseTaskOptions
  }

  if (opts.before && Array.isArray(opts.before)) {
    opts.before.push(simulationTask)
  } else if (opts.before) {
    opts.before = [opts.before, simulationTask]
  } else {
    opts.before = [simulationTask]
  }

  opts.stage = simulationStage

  return useTask(key, fn, opts)
}

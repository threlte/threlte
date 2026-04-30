import { useScheduler } from '../context/fragments/scheduler.svelte.js'
import type { CreateStageOptions, Key } from '../frame-scheduling/index.js'

/**
 * Creates a stage and returns it. If the stage already exists, it is returned.
 *
 * @param key The key of the stage.
 * @param options Options for creating the stage.
 */
export function useStage(key: Key, options?: CreateStageOptions) {
  const { scheduler } = useScheduler()
  return scheduler.getStage(key) ?? scheduler.createStage(key, options)
}

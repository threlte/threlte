import { useThrelte } from '../context/compounds/useThrelte'
import type { CreateStageOptions, Key } from '../frame-scheduling'

/**
 * Creates a stage and returns it. If the stage already exists, it is returned.
 *
 * @param key The key of the stage.
 * @param options Options for creating the stage.
 */
export function useStage(key: Key, options?: CreateStageOptions) {
  const { scheduler } = useThrelte()
  return scheduler.getStage(key) ?? scheduler.createStage(key, options)
}

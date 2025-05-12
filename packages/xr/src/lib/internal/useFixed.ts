import { useTask, type ThrelteUseTaskOptions } from '@threlte/core'

type UseFixedOptions = ThrelteUseTaskOptions & {
  fixedStep?: number
}

/**
 * A fixed useTask, based on https://github.com/threlte/threlte/pull/654
 *
 * @Todo Can be removed if this or a similar feature is merged.
 */
export const useFixed = (fn: (delta: number) => void, options: UseFixedOptions) => {
  let fixedStepTimeAccumulator = 0

  const fixedStep = options.fixedStep ?? 1 / 60

  return useTask((delta) => {
    fixedStepTimeAccumulator += delta

    while (fixedStepTimeAccumulator >= fixedStep) {
      fixedStepTimeAccumulator -= fixedStep
      fn(fixedStep)
    }
  }, options)
}

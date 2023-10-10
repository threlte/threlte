import { useFrame, type ThrelteUseFrameOptions, type ThrelteContext } from "@threlte/core";

type UseFixedOptions = ThrelteUseFrameOptions & {
  fixedStep?: number
}

/**
 * A fixed useFrame, based on https://github.com/threlte/threlte/pull/654
 * 
 * @Todo Can be removed if this or a similar feature is merged.
 */
export const useFixed = (fn: (ctx: ThrelteContext, delta: number) => void, options: UseFixedOptions) => {
  let fixedStepTimeAccumulator = 0
  let fixedStep = options.fixedStep ?? 1 / 60

  return useFrame((ctx, delta) => {
    fixedStepTimeAccumulator += delta

    while (fixedStepTimeAccumulator >= fixedStep) {
      fixedStepTimeAccumulator -= fixedStep
      fn(ctx, fixedStep)
    }
  }, options)
}

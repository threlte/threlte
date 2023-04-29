import type { ThrelteTransitionConfig, ThrelteTransitionInput } from './types'

export const createTransition = <Ref>(
  callback: (...args: ThrelteTransitionInput<Ref>) => ThrelteTransitionConfig
) => {
  return callback
}

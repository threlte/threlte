import type { XRHand } from '../types'
import { toCurrentReadable, type CurrentReadable } from './currentReadable.svelte'

class Hands {
  left = $state.raw<XRHand>()
  right = $state.raw<XRHand>()
}

export const hands = new Hands()

/**
 * Provides a reference to a current XRHand, filtered by handedness.
 */
export const useHand = (handedness: 'left' | 'right'): CurrentReadable<undefined | XRHand> => {
  switch (handedness) {
    case 'left':
      return toCurrentReadable(() => hands.left)
    case 'right':
      return toCurrentReadable(() => hands.right)
    default:
      throw new Error('useHand handedness must be left or right.')
  }
}

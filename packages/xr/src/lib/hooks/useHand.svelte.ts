import type { XRHandObject } from '../types.js'
import { toCurrentReadable, type CurrentReadable } from './currentReadable.svelte.js'

class Hands {
  left = $state.raw<XRHandObject>()
  right = $state.raw<XRHandObject>()
}

export const hands = new Hands()

/**
 * Provides a reference to a current XRHand, filtered by handedness.
 */
export const useHand = (
  handedness: 'left' | 'right'
): CurrentReadable<undefined | XRHandObject> => {
  switch (handedness) {
    case 'left':
      return toCurrentReadable(() => hands.left)
    case 'right':
      return toCurrentReadable(() => hands.right)
    default:
      throw new Error('useHand handedness must be left or right.')
  }
}

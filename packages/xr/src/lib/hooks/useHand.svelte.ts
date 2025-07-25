import type { XRHand } from '../types'
import { toStore, type Readable } from 'svelte/store'

class Hands {
  left = $state.raw<XRHand>()
  right = $state.raw<XRHand>()
}

export const hands = new Hands()

/**
 * Provides a reference to a current XRHand, filtered by handedness.
 */
export const useHand = (handedness: 'left' | 'right'): Readable<undefined | XRHand> => {
  switch (handedness) {
    case 'left':
      return toStore(() => hands.left)
    case 'right':
      return toStore(() => hands.right)
    default:
      throw new Error('useHand handedness must be left or right.')
  }
}

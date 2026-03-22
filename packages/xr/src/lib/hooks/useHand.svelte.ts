import type { XRHandObject } from '../types.js'

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
): { readonly current: XRHandObject | undefined } => {
  switch (handedness) {
    case 'left':
      return {
        get current() {
          return hands.left
        }
      }
    case 'right':
      return {
        get current() {
          return hands.right
        }
      }
    default:
      throw new Error('useHand handedness must be left or right.')
  }
}

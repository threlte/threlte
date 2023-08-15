import { currentWritable, type CurrentWritable } from '@threlte/core'
import type { XRHand } from '$lib/types'

export const left = currentWritable<undefined | XRHand>(undefined)
export const right = currentWritable<undefined | XRHand>(undefined)

/**
 * Provides a reference to a current XRHand, filtered by handedness.
 */
export const useXrHand = (handedness: 'left' | 'right'): CurrentWritable<undefined | XRHand> => {
  switch (handedness) {
    case 'left': return left
    case 'right': return right
  }
}

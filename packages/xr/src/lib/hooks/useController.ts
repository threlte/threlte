import { currentWritable, type CurrentWritable } from '@threlte/core'
import type { XRController } from '../types'

export const left = currentWritable<XRController | undefined>(undefined)
export const right = currentWritable<XRController | undefined>(undefined)
export const gaze = currentWritable<XRController | undefined>(undefined)

/**
 * Provides a reference to a current XRController, filtered by handedness.
 */
export const useController = (
  handedness: XRHandedness
): CurrentWritable<XRController | undefined> => {
  switch (handedness) {
    case 'left':
      return left
    case 'right':
      return right
    case 'none':
      return gaze
    default:
      throw new Error('useController handedness must be left, right, or none.')
  }
}

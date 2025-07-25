import type { XRController } from '../types'
import { type Readable, toStore } from 'svelte/store'

class Controllers {
  left = $state.raw<XRController>()
  right = $state.raw<XRController>()
  none = $state.raw<XRController>()
}

export const controllers = new Controllers()

/**
 * Provides a reference to a current XRController, filtered by handedness.
 */
export const useController = (handedness: XRHandedness): Readable<XRController | undefined> => {
  switch (handedness) {
    case 'left':
      return toStore(() => controllers.left)
    case 'right':
      return toStore(() => controllers.right)
    case 'none':
      return toStore(() => controllers.none)
    default:
      throw new Error('useController handedness must be left, right, or none.')
  }
}

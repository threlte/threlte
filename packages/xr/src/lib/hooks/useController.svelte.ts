import type { XRController } from '../types.js'
import {
  getControllerState,
  type XRControllerSourceState
} from '../internal/inputSources.svelte.js'
import { runeToCurrentReadable, type CurrentReadable } from './currentReadable.svelte.js'

const controllerObjects = new WeakMap<XRControllerSourceState, XRController>()

const toXRController = (state: XRControllerSourceState | undefined): XRController | undefined => {
  if (state === undefined) return undefined

  let controller = controllerObjects.get(state)
  if (controller !== undefined) return controller

  controller = {
    inputSource: state.inputSource,
    targetRay: state.targetRay,
    grip: state.grip,
    model: state.model
  }
  controllerObjects.set(state, controller)
  return controller
}

class Controllers {
  get left() {
    return toXRController(getControllerState('left'))
  }

  get right() {
    return toXRController(getControllerState('right'))
  }

  get none() {
    return toXRController(getControllerState('none'))
  }
}

export const controllers = new Controllers()

/**
 * Provides a reference to a current XRController, filtered by handedness.
 */
export const useController = (
  handedness: XRHandedness
): CurrentReadable<XRController | undefined> => {
  switch (handedness) {
    case 'left':
      return runeToCurrentReadable(() => controllers.left)
    case 'right':
      return runeToCurrentReadable(() => controllers.right)
    case 'none':
      return runeToCurrentReadable(() => controllers.none)
    default:
      throw new Error('useController handedness must be left, right, or none.')
  }
}

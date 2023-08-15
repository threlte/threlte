export { useHitTest } from './use-hit-test'
export { useTeleport } from './use-teleport'
export { useController, useGamepad } from './use-controller'
export { useControllerEvent, useHandEvent } from './use-xr-event'
export { useHandJoint } from './use-hand-joint' 
export { useXR } from './use-xr'

import { useController, useGamepad } from './use-controller'
import { useControllerEvent, useHandEvent } from './use-xr-event'
import { useHandJoint } from './use-hand-joint'

/**
 * @deprecated useXrController is deprecated, use useController.
 */
export const useXrController = (handedness: XRHandedness) => {
  console.warn('useXrController is deprecated, use useController.')
  return useController(handedness)
}

/**
 * @deprecated useXRGamepad is deprecated, use useGamepad.
 */
export const useXrGamepad = (handedness: 'left' | 'right') => {
  console.warn('useXRGamepad is deprecated, use useGamepad.')
  return useGamepad(handedness)
}

/**
 * @deprecated useXRControllerEvent is deprecated, use useControllerEvent.
 */
export const useXRControllerEvent = (event: any, handler: any) => {
  console.warn('useXRControllerEvent is deprecated, use useControllerEvent.')
  return useControllerEvent(event, handler)
}

/**
 * @deprecated useXRHandEvent is deprecated, use useHandEvent.
 */
export const useXRHandEvent = (event: any, handler: any) => {
  console.warn('useXRHandEvent is deprecated, use useHandEvent.')
  return useHandEvent(event, handler)
}

/**
 * @deprecated useXRHandJoint is deprecated, use useHandJoint.
 */
export const useXRHandJoint = (handedness: any, joint: any) => {
  console.warn('useXRHandJoint is deprecated, use useHandJoint.')
  return useHandJoint(handedness, joint)
}
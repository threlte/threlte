import { onDestroy } from 'svelte'
import { isHandTracking } from '../internal/stores'
import { on, off } from '../internal/events'
import type {
  XRControllerEventType,
  XRHandEventType,
  XRControllerEvent,
  XRHandEvent
} from '../types'

/**
 * Adds listeners for controller events.
 */
export const useControllerEvent = (
  event: XRControllerEventType,
  handler: (event: XRControllerEvent) => void,
  { handedness }: { handedness?: XRHandedness } = {}
): void => {
  const listener = (event: XRControllerEvent, metadata?: { input: 'hand' | 'controller'}) => {
    if (metadata?.input === 'hand') return
    if (handedness !== undefined && event.data?.handedness !== handedness) {
      return
    }

    handler(event)
  }

  on<XRControllerEvent>(event, listener)

  onDestroy(() => off(event, listener))
}

/**
 * Adds listeners for hand events.
 */
export const useHandEvent = (
  event: XRHandEventType,
  handler: (event: XRHandEvent<XRHandEventType, null | THREE.XRHandSpace>) => void,
  { handedness }: { handedness?: 'left' | 'right' } = {}
): void => {
  const listener = (event: XRHandEvent<XRHandEventType, null | THREE.XRHandSpace>, metadata?: { input: 'hand' | 'controller'}) => {
    if (metadata?.input === 'controller') return
    if (handedness !== undefined && event.data.handedness !== handedness) {
      return
    }

    handler(event)
  }

  on<XRHandEvent>(event, listener)

  onDestroy(() => off(event, listener))
}

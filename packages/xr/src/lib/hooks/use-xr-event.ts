import { onDestroy } from 'svelte'
import { on, off } from '$lib/internal/events'
import type {
  XRControllerEventType,
  XRHandEventType,
  XRControllerEvent,
  XRHandEvent,
} from '$lib/types'

/**
 * Adds listeners for controller events.
 */
export const useControllerEvent = (
  event: XRControllerEventType,
  handler: (event: XRControllerEvent) => void,
  { handedness }: { handedness?: XRHandedness } = {}
): void => {
  const listener = (event: XRControllerEvent) => {
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
  const listener = (event: XRHandEvent<XRHandEventType, null | THREE.XRHandSpace>) => {
    if (handedness !== undefined && event.handedness !== handedness) {
      return
    }

    handler(event)
  }

  on(event, listener)

  onDestroy(() => off(event, listener))
}

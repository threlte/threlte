import { onDestroy } from 'svelte'
import { off, on } from '../internal/events'
import type {
  XRControllerEvent,
  XRControllerEventType,
  XRHandEvent,
  XRHandEventType
} from '../types'

/**
 * Adds listeners for controller events.
 */
export const useControllerEvent = (
  eventType: XRControllerEventType,
  handler: (event: XRControllerEvent) => void,
  { handedness }: { handedness?: XRHandedness } = {}
): void => {
  const listener = (event: XRControllerEvent, metadata?: { input: 'hand' | 'controller' }) => {
    if (metadata?.input === 'hand') return
    if (handedness !== undefined && event.data?.handedness !== handedness) {
      return
    }

    handler(event)
  }

  onDestroy(on<XRControllerEvent>(eventType, listener))
}

/**
 * Adds listeners for hand events.
 */
export const useHandEvent = (
  event: XRHandEventType,
  handler: (event: XRHandEvent<XRHandEventType, null | THREE.XRHandSpace>) => void,
  { handedness }: { handedness?: 'left' | 'right' } = {}
): void => {
  const listener = (
    event: XRHandEvent<XRHandEventType, null | THREE.XRHandSpace>,
    metadata?: { input: 'hand' | 'controller' }
  ) => {
    if (metadata?.input === 'controller') return
    const eventHandedness = event.handedness ?? event.data?.handedness
    if (handedness !== undefined && eventHandedness !== handedness) {
      return
    }

    handler(event)
  }

  onDestroy(on<XRHandEvent>(event, listener))
}

import { writable } from 'svelte/store'
import { watch } from '../../../lib/storeUtils'
import type { EventDispatcher } from 'three'

type Events = Record<string, (arg: unknown) => void>

/**
 * Typeguard to check if a value is extending THREE.EventDispatcher
 * @param value
 * @returns
 */
const isEventDispatcher = (value: object): value is EventDispatcher => {
  return 'addEventListener' in value && 'removeEventListener' in value
}

export const useEvents = (events: Events = {}) => {
  const eventHandlerProxy = (
    event?: {
      type?: string
    } & Record<string, any>
  ) => {
    if (event?.type) {
      events[event.type]?.(event)
    }
  }

  const cleanupEventListeners = ($ref: EventDispatcher, events: Events) => {
    for (const eventName of Object.keys(events)) {
      $ref.removeEventListener(eventName, eventHandlerProxy)
    }
  }

  const addEventListeners = ($ref: EventDispatcher, events: Events) => {
    for (const eventName of Object.keys(events)) {
      $ref.addEventListener(eventName, eventHandlerProxy)
    }
  }

  const ref = writable<EventDispatcher>()

  watch(ref, ($ref) => {
    if (!$ref) return
    addEventListeners($ref, events)
    return () => cleanupEventListeners($ref, events)
  })

  const updateRef = (newRef: object) => {
    if (isEventDispatcher(newRef)) {
      ref.set(newRef)
    }
  }

  return {
    updateRef
  }
}

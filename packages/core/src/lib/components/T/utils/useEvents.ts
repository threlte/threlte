import { writable } from 'svelte/store'
import { watch } from '../../../lib/storeUtils'
import type { Event, EventDispatcher } from 'three'

type Props = Record<string, (arg: unknown) => void>

/**
 * Typeguard to check if a value is extending THREE.EventDispatcher
 * @param value
 * @returns
 */
const isEventDispatcher = (value: object): value is EventDispatcher => {
  return 'addEventListener' in value && 'removeEventListener' in value
}

export const useEvents = (props: Props = {}) => {
  const eventHandlerProxy = (event?: Event) => {
    if (event?.type) {
      props[`on${event.type}`]?.(event)
    }
  }

  const cleanupEventListeners = ($ref: EventDispatcher, props: Props) => {
    for (const eventName of Object.keys(props)) {
      if (eventName.startsWith('on')) {
        $ref.removeEventListener(eventName.slice(2), eventHandlerProxy)
      }
    }
  }

  const addEventListeners = ($ref: EventDispatcher, props: Props) => {
    for (const eventName of Object.keys(props)) {
      if (eventName.startsWith('on')) {
        $ref.addEventListener(eventName.slice(2), eventHandlerProxy)
      }
    }
  }

  const ref = writable<EventDispatcher>()

  watch(ref, ($ref) => {
    if (!$ref) return
    addEventListeners($ref, props)
    return () => cleanupEventListeners($ref, props)
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

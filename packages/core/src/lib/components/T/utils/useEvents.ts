import type { Event, EventDispatcher } from 'three'
import type { MaybeInstance } from '../types'

type Props = Record<string, (arg: unknown) => void>

/**
 * Typeguard to check if a value is extending THREE.EventDispatcher
 * @param value
 * @returns
 */
const isEventDispatcher = <T>(
  value: MaybeInstance<T>
): value is MaybeInstance<T> & EventDispatcher => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'addEventListener' in value &&
    'removeEventListener' in value
  )
}

export const useEvents = <T>(props: Props = {}) => {
  const eventHandlerProxy = (event?: Event) => {
    if (event?.type) {
      props[`on${event.type}`]?.(event)
    }
  }

  const addedEventListeners: string[] = []

  const cleanupEventListeners = (ref: EventDispatcher) => {
    for (let i = 0; i < addedEventListeners.length; i++) {
      const eventName = addedEventListeners[i]
      ref.removeEventListener(eventName, eventHandlerProxy)
    }
    addedEventListeners.length = 0
  }

  const addEventListeners = (ref: EventDispatcher, props: Props) => {
    for (const eventName of Object.keys(props)) {
      if (eventName.startsWith('on')) {
        ref.addEventListener(eventName.slice(2), eventHandlerProxy)
        addedEventListeners.push(eventName)
      }
    }
  }

  const updateRef = (ref: MaybeInstance<T>) => {
    if (!isEventDispatcher(ref)) return

    addEventListeners(ref, props)
    return () => cleanupEventListeners(ref)
  }

  return {
    updateRef
  }
}

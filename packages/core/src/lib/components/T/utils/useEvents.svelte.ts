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
): value is MaybeInstance<T> & EventDispatcher<Record<string, unknown>> => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'addEventListener' in value &&
    'removeEventListener' in value
  )
}

export const useEvents = <T>(props: Props, getRef: () => MaybeInstance<T>) => {
  const eventHandlerProxy = (event?: Event) => {
    if (event?.type) {
      props[`on${event.type}`]?.(event)
    }
  }

  $effect.pre(() => {
    const ref = getRef()

    if (!isEventDispatcher(ref)) return

    const eventNames: string[] = []

    for (const eventName of Object.keys(props)) {
      if (eventName.startsWith('on')) {
        ref.addEventListener(eventName.slice(2), eventHandlerProxy)
        eventNames.push(eventName)
      }
    }

    return () => {
      for (let i = 0; i < eventNames.length; i++) {
        ref.removeEventListener(eventNames[i], eventHandlerProxy)
      }
    }
  })
}

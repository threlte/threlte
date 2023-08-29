import { onDestroy, onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'
import { createRawEventDispatcher } from '../../../lib/createRawEventDispatcher'

/**
 * Typeguard to check if a value is extending THREE.EventDispatcher
 * @param value
 * @returns
 */
const isEventDispatcher = (
  value: any
): value is {
  addEventListener: (type: string, listener: (event: any) => void) => void
  removeEventListener: (type: string, listener: (event: any) => void) => void
} => {
  return !!value?.addEventListener
}

export const useEvents = () => {
  const dispatch = createRawEventDispatcher()
  const component = get_current_component()

  const eventHandlerProxy = (
    event?: {
      type?: string
    } & Record<string, any>
  ) => {
    if (event?.type) {
      dispatch(event.type, event)
    }
  }

  const cleanupEventListeners = (ref: any, events: string[]) => {
    if (isEventDispatcher(ref)) {
      events.forEach((eventName) => {
        ref.removeEventListener(eventName, eventHandlerProxy)
      })
    }
  }

  const addEventListeners = (ref: any, events: string[]) => {
    if (isEventDispatcher(ref)) {
      events.forEach((eventName) => {
        ref.addEventListener(eventName, eventHandlerProxy)
      })
    }
  }

  let currentEventNames: string[] = []
  let currentRef: any | undefined

  const eventNames = writable<string[]>([])
  const unsubscribeEventNames = eventNames.subscribe((eventNames) => {
    cleanupEventListeners(currentRef, currentEventNames)
    addEventListeners(currentRef, eventNames)
    currentEventNames = eventNames
  })
  onDestroy(unsubscribeEventNames)

  const ref = writable<any>()
  const unsubscribeRef = ref.subscribe((value) => {
    cleanupEventListeners(currentRef, currentEventNames)
    addEventListeners(value, currentEventNames)
    currentRef = value
  })
  onDestroy(unsubscribeRef)

  // cleanup all event listeners
  onDestroy(() => {
    cleanupEventListeners(currentRef, currentEventNames)
  })

  // get all event callbacks from component
  onMount(() => {
    eventNames.set(Object.keys(component.$$.callbacks))
  })

  const updateRef = (newRef: any) => {
    ref.set(newRef)
  }

  return {
    updateRef
  }
}

import { onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'

type EventCallback = (...args: any[]) => void
type EventCallbackMap = Record<string, EventCallback[]>

/**
 * A hook that returns the events of a component and a callback that will be invoked as soon as the component has events to listen to.
 * This callback will be called on mount and only if the demanded events are present.
 * @param callback A callback that will be invoked as soon as the component has events to listen to. This callback will be called on mount and only if the demanded events are present.
 * @param eventNames An array of event names to listen to. If not passed, all events will be listened to.
 * @returns
 */
export const useComponentEvents = (
  /**
   * @param callback Pass a callback to get the event names and callbacks of a
   * component. The callback will be called on mount and only if the demanded
   * events are present.
   */
  callback?: (params: { eventNames: string[]; callbacks: EventCallbackMap }) => void,
  /**
   * @param eventNames Pass an array of event names to listen to
   */
  eventNames?: string[]
) => {
  const component = get_current_component()
  const eventNamesStore = writable<string[]>([])
  const callbacks = writable<Record<string, ((...args: any[]) => void)[]>>({})

  onMount(() => {
    const filteredEventNames = Object.keys(component.$$.callbacks).filter((value) =>
      eventNames ? eventNames.includes(value) : true
    )
    eventNamesStore.set(filteredEventNames)
    const filteredCallbacks = Object.fromEntries(
      Object.entries(component.$$.callbacks).filter(([key]) =>
        eventNames ? eventNames.includes(key) : true
      )
    ) as EventCallbackMap
    callbacks.set(filteredCallbacks)

    if (filteredEventNames.length) {
      callback?.({
        callbacks: filteredCallbacks,
        eventNames: filteredEventNames
      })
    }
  })

  return {
    eventNames: eventNamesStore,
    callbacks
  }
}

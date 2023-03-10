import { get_current_component } from 'svelte/internal'

/**
 * This event dispatcher creates Raw Events unline sveltes own event dispatcher
 * which nests the data in a detail object. This is not nesessary for some use
 * cases and makes it harder to work with the data.
 * @returns
 */

export function createRawEventDispatcher<EventMap extends Record<string, unknown> = any>(): (<
  EventKey extends Extract<keyof EventMap, string>
>(
  type: EventKey,
  value?: EventMap[EventKey]
) => void) & {
  hasEventListener: <EventKey extends Extract<keyof EventMap, string>>(type: EventKey) => boolean
} {
  const component = get_current_component()

  const dispatchRawEvent = (type: string, value: any) => {
    const callbacks = component.$$.callbacks[type]
    if (callbacks) {
      callbacks.forEach((fn: (...args: any[]) => any) => {
        fn(value)
      })
    }
  }

  const hasEventListener = <EventKey extends Extract<keyof EventMap, string>>(type: EventKey) => {
    return Boolean(component.$$.callbacks[type])
  }

  dispatchRawEvent.hasEventListener = hasEventListener

  return dispatchRawEvent as ReturnType<typeof createRawEventDispatcher>
}

import { get_current_component } from 'svelte/internal'

/**
 * This event dispatcher creates Raw Events unline sveltes own event dispatcher
 * which nests the data in a detail object. This is not nesessary for our use
 * case and makes it harder to work with the data.
 * @returns
 */

export function createRawEventDispatcher<EventMap extends Record<string, unknown> = any>(): <
  EventKey extends Extract<keyof EventMap, string>
>(
  type: EventKey,
  value?: EventMap[EventKey]
) => void {
  const component = get_current_component()

  const dispatchRawEvent = (type: string, value: any) => {
    component.$$.callbacks[type]?.forEach((fn: (...args: any[]) => any) => {
      fn(value)
    })
  }

  return dispatchRawEvent
}

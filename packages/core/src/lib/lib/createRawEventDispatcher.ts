import { useGetEvents } from './useGetEvents'

type Dispatcher<EventMap extends Record<string, unknown>> = <Type extends keyof EventMap>(
  type: Type,
  payload?: EventMap[Type]
) => void

type HasEventListener<EventMap extends Record<string, unknown>> = <Type extends keyof EventMap>(
  type: Type
) => boolean

type RawEventDispatcher<EventMap extends Record<string, unknown>> = Dispatcher<EventMap> & {
  hasEventListener: HasEventListener<EventMap>
}

/**
 * ### `createRawEventDispatcher`
 *
 * This event dispatcher creates raw events unlike Svelte's own event dispatcher
 * which nests the data in a detail object (`CustomEvent<Payload>`). This is not
 * nesessary for a lot of Threlte use cases and makes it harder to work with the payload.
 *
 * @example
 *
 * ComponentA.svelte:
 * ```svelte
 * <script>
 * 	const dispatch = createRawEventDispatcher<{ foo: string }>()
 * 	dispatch('foo', 'bar')
 * </script>
 * ```
 *
 * ComponentB.svelte:
 * ```svelte
 * <ComponentA on:foo={(e) => console.log(e)} /> <!-- 'bar' -->
 * ```
 */
export const createRawEventDispatcher = <
  EventMap extends Record<string, unknown> = any
>(events?: any): RawEventDispatcher<EventMap> => {
  const getEvents = useGetEvents(events)

  const dispatchRawEvent: Dispatcher<EventMap> = (type, value) => {
    const callbacks = getEvents()[type]
    if (callbacks) {
      callbacks.forEach((fn: (...args: any[]) => any) => {
        fn(value)
      })
    }
  }

  const hasEventListener: HasEventListener<EventMap> = (type) => {
    return Boolean(getEvents()[type])
  }

  Object.defineProperty(dispatchRawEvent, 'hasEventListener', {
    value: hasEventListener,
    enumerable: true
  })

  return dispatchRawEvent as RawEventDispatcher<EventMap>
}

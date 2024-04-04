import { getContext, setContext } from 'svelte'

type EventListener = (...args: unknown[]) => void

export type Events = Record<string, EventListener | EventListener[]>

const key = 'threlte-component-events'

export const createComponentEventsContext = (events: Events = {}) => {
  setContext(key, events)

  return events
}

export const useComponentEvents = (): Events => {
  return getContext<Events>(key)
}

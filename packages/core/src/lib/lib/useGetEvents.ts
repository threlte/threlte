import * as Internal from 'svelte/internal'

export const useGetEvents = (events?: any) => {
  const component = typeof Internal.get_current_component === 'undefined'
    ? undefined
    : Internal.get_current_component()

  // Svelte 4
  if (component) {
    return component.$$.callbacks ?? {}
  }

  // Svelte 5
  return () => {
    if (events === undefined) {
      return {}
    }

    const eventMap: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(events)) {
      if (typeof value === 'function') {
        eventMap[key] = [value]
      } else {
        // 
      }
    }

    return eventMap
  }
}

import { getContext } from 'svelte'

export const useHasEventListeners = <T extends (type: any) => void = any>(): {
  hasEventListeners: (type: Parameters<T>[0]) => boolean
} => {
  const events = getContext('threlte-component-events')

  const hasEventListeners = (type: Parameters<T>[0]) => {
    return type in events
  }

  return {
    hasEventListeners
  }
}

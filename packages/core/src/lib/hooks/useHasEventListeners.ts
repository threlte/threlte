import { get_current_component } from 'svelte/internal'

export const useHasEventListeners = <T extends (type: any) => void = any>(): {
  hasEventListeners: (type: Parameters<T>[0]) => boolean
} => {
  const component = get_current_component()

  const hasEventListeners = (type: Parameters<T>[0]) => {
    const callbacks = component.$$.callbacks
    return type in callbacks && (callbacks[type] as any[]).length > 0
  }

  return {
    hasEventListeners
  }
}

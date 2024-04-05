export const useHasEventListeners = <T extends (type: any) => any = any>(): {
  hasEventListeners: (type: Parameters<T>[0]) => boolean
} => {
  // const component = get_current_component()

  const hasEventListeners = (type: Parameters<T>[0]) => {
    // const callbacks = component.$$.callbacks
    return true
    // return type in callbacks && (callbacks[type] as any[]).length > 0
  }

  return {
    hasEventListeners
  }
}

export const useHasEventListeners = <T extends (type: any) => void = any>(): {
  hasEventListeners: (type: Parameters<T>[0]) => boolean
} => {
  const hasEventListeners = (type: Parameters<T>[0]) => {
    return true
  }

  return {
    hasEventListeners
  }
}

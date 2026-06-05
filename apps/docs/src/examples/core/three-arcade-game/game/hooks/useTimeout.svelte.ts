export const useTimeout = () => {
  const timeoutHandlers = new Set<ReturnType<typeof setTimeout>>()

  const timeout = (callback: () => void, ms: number) => {
    const handler = setTimeout(callback, ms)
    timeoutHandlers.add(handler)
  }

  $effect(() => {
    return () => {
      for (const handler of timeoutHandlers) {
        clearTimeout(handler)
      }
    }
  })

  return {
    timeout
  }
}

import { onDestroy } from 'svelte'

export const useTimeout = () => {
  const timeoutHandlers = new Set<ReturnType<typeof setTimeout>>()

  const timeout = (callback: () => void, ms: number) => {
    const handler = setTimeout(callback, ms)
    timeoutHandlers.add(handler)
  }

  onDestroy(() => {
    timeoutHandlers.forEach((handler) => clearTimeout(handler))
  })

  return {
    timeout
  }
}

import { onDestroy } from 'svelte'

const unloadHandlers = new Set<() => void>()
const finalUnloadHandlers = new Set<() => void>()

export const beforeUnload = (handler: () => void, final?: boolean) => {
  if (final) {
    finalUnloadHandlers.add(handler)
  } else {
    unloadHandlers.add(handler)
  }

  onDestroy(() => {
    unloadHandlers.delete(handler)
    finalUnloadHandlers.delete(handler)
  })
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    for (const handler of unloadHandlers) {
      handler()
    }

    for (const handler of finalUnloadHandlers) {
      handler()
    }
  })
}

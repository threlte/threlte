import { onMount } from 'svelte'
import { writable } from 'svelte/store'

export const useComponentHasEventHandlers = (eventNames: string[]) => {
  const hasEventHandlers = writable(false)

  onMount(() => {
    hasEventHandlers.set(true)
  })

  return {
    hasEventHandlers
  }
}

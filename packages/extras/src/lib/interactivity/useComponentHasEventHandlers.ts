import { onMount, getContext } from 'svelte'
import { writable } from 'svelte/store'

export const useComponentHasEventHandlers = (eventNames: string[]) => {
  const events = getContext('threlte-component-events')
  const hasEventHandlers = writable(false)

  onMount(() => {
    hasEventHandlers.set(Object.keys(events).some((value) => eventNames.includes(value)))
  })

  return {
    hasEventHandlers
  }
}

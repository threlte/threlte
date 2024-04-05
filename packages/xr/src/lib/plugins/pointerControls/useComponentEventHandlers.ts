import { onMount } from 'svelte'
import { writable } from 'svelte/store'
// import { events } from './types'

export const useComponentHasEventHandlers = () => {
  const hasEventHandlers = writable(false)

  onMount(() => {
    // const match = Object.keys(component.$$.callbacks).some((callback) => events.includes(callback))
    hasEventHandlers.set(true)
  })

  return {
    hasEventHandlers
  }
}

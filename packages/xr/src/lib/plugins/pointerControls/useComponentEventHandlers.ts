import { onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'
import { events } from './types'

export const useComponentHasEventHandlers = () => {
  const component = get_current_component()
  const hasEventHandlers = writable(false)

  onMount(() => {
    const match = Object.keys(component.$$.callbacks).some((callback) => events.includes(callback))
    hasEventHandlers.set(match)
  })

  return {
    hasEventHandlers
  }
}

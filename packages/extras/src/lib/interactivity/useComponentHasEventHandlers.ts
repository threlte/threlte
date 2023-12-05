import { onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'

export const useComponentHasEventHandlers = (eventNames: string[]) => {
  const component = get_current_component()
  const hasEventHandlers = writable(false)

  onMount(() => {
    hasEventHandlers.set(
      Object.keys(component.$$.callbacks).some((value) => eventNames.includes(value))
    )
  })

  return {
    hasEventHandlers
  }
}

import { onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'

export const useComponentHasEventHandlers = (eventNames: string[]) => {
  const component = get_current_component()
  const hasEventHandlers = writable<boolean>(false)

  onMount(() => {
    hasEventHandlers.set(
      !!Object.keys(component.$$.callbacks).filter((value) =>
        eventNames ? eventNames.includes(value) : true
      ).length
    )
  })

  return {
    hasEventHandlers
  }
}

import { onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'

export const useComponentEvents = () => {
  const component = get_current_component()
  const eventNames = writable<string[]>([])
  const callbacks = writable<Record<string, ((...args: any[]) => void)[]>>({})

  onMount(() => {
    eventNames.set(Object.keys(component.$$.callbacks))
    callbacks.set(component.$$.callbacks)
  })

  return {
    eventNames,
    callbacks
  }
}

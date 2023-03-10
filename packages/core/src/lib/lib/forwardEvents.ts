import type { SvelteComponent } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'
import { watch } from './storeUtils'

export const forwardEvents = () => {
  const component = get_current_component()

  const dispatchingComponent = writable<SvelteComponent | undefined>(undefined)

  watch(dispatchingComponent, (dispatchingComponent) => {
    if (!dispatchingComponent) return
    Object.entries(component.$$.callbacks).forEach((callback) => {
      const [key, value] = callback as [string, ((...args: any[]) => void)[]]
      if (
        key in dispatchingComponent.$$.callbacks &&
        Array.isArray(dispatchingComponent.$$.callbacks[key])
      ) {
        dispatchingComponent.$$.callbacks[key].push(...value)
      } else {
        dispatchingComponent.$$.callbacks[key] = value
      }
    })
  })

  return dispatchingComponent
}

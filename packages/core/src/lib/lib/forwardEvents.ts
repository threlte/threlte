import type { SvelteComponent } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'
import { watch } from './storeUtils'

/**
 * ### `forwardEvents`
 *
 * Natively, Svelte has no way of passing down event listeners inside a
 * component to a child component. Events have to be hand-wired upstream. This
 * function allows you to forward events from a parent component to a child
 * component.
 *
 * ```svelte
 * <!-- Child.svelte -->
 * <script>
 * 	import { forwardEvents } from '@threlte/core'
 * 	const dispatchingComponent = forwardEvents()
 * </script>
 *
 * <OtherChildComponent bind:this={$dispatchingComponent} />
 * ```
 *
 * Now, when implementing `<Child>` and adding event listeners via `on:eventname`,
 * those event listeners will be forwarded to `<OtherChildComponent>`.
 */
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

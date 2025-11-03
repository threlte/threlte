import { watch } from '@threlte/core'
import { getContext, onMount } from 'svelte'
import { writable } from 'svelte/store'
import { suspenseContextIdentifier, type SuspenseContext } from './context.js'

/**
 * ### `onSuspend`
 *
 * This hook is used to trigger a callback when the component is suspended. It
 * works within the boundaries of the <Suspense> component. If there is no
 * <Suspense> component, the callback will not be executed, as the component
 * will never suspend.
 *
 * @param {() => void} callback - The function to be executed when the component
 * is suspended.
 */
export const onSuspend = (callback: () => void): void => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  // If there's no Suspense boundary, we can just return, the component will never suspend.
  if (!ctx) return

  const mounted = writable(false)
  onMount(() => {
    mounted.set(true)
  })

  watch([ctx.suspended, mounted], ([suspended, mounted]) => {
    if (mounted && suspended) callback()
  })
}

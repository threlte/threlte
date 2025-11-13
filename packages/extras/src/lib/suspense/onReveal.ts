import { watch } from '@threlte/core'
import { getContext, onDestroy, onMount } from 'svelte'
import { writable } from 'svelte/store'
import { suspenseContextIdentifier, type SuspenseContext } from './context.js'

/**
 * ### `onReveal`
 *
 * This hook is used to trigger a callback when the component is revealed (i.e.,
 * no longer suspended). It works within the boundaries of the <Suspense>
 * component and mimics Svelte's lifecycle method `onMount` If there is no
 * <Suspense> component, the callback will be executed immediately as the
 * component will never suspend.
 *
 * Note: This hook triggers with Svelte's `onMount` and can be used in its place
 * for triggering animations, etc., within the boundaries of a <Suspense>
 * component. Just like `onMount` you may return a cleanup function to be
 * executed when the component is unmounted or when the component is suspended
 * again.
 *
 * @param {() => void} callback - The function to be executed when the component
 * is revealed.
 */
export const onReveal = (callback: () => (() => void) | void): void => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  let cleanup: (() => void) | void

  const mounted = writable(false)
  onMount(() => {
    // If there is no context, we are not in a suspense context, so we can just call the callback.
    if (!ctx) cleanup = callback()
    mounted.set(true)
  })

  // Return if there is no context.
  if (!ctx) {
    onDestroy(() => cleanup?.())
    return
  }

  watch([ctx.suspended, mounted], ([suspended, mounted]) => {
    if (mounted && !suspended) cleanup = callback()
    return () => cleanup?.()
  })
}

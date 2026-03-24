import { getContext } from 'svelte'
import { suspenseContextIdentifier, type SuspenseContext } from './context.js'
import { fromStore } from 'svelte/store'

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

  const suspended = fromStore(ctx.suspended)

  $effect.pre(() => {
    if (suspended.current) {
      callback()
    }
  })
}

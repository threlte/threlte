import { getContext } from 'svelte'
import { get_current_component, onDestroy } from 'svelte/internal'
import { derived, readable } from 'svelte/store'
import { suspenseContextIdentifier, type SuspenseContext } from './context'

/**
 * This hook is used to suspend the component until the promise is resolved.
 * It also works outside the boundaries of the <Suspense> component.
 */
export const useSuspense = () => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  const component = get_current_component()

  const suspend = <T extends Promise<any>>(promise: T): T => {
    ctx?.suspend(component, promise)
    return promise
  }

  const state = {
    suspended: derived(ctx?.suspended ?? readable(false), (suspended) => suspended)
  }

  onDestroy(() => {
    ctx?.onComponentDestroy(component)
  })

  return Object.assign(suspend, state)
}

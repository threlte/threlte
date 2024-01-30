import { getContext, onDestroy } from 'svelte'
import { derived, readable } from 'svelte/store'
import { suspenseContextIdentifier, type SuspenseContext } from './context'

/**
 * This hook is used to suspend the component until the promise is resolved.
 * It also works outside the boundaries of the <Suspense> component.
 */
export const useSuspense = () => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  let _promise: Promise<any> | undefined

  const suspend = <T extends Promise<any>>(promise: T): T => {
    ctx?.suspend(promise)
    return promise
  }

  const state = {
    suspended: derived(ctx?.suspended ?? readable(false), (suspended) => suspended)
  }

  onDestroy(() => {
    if (_promise) {
      ctx?.onComponentDestroy(_promise)
    }
  })

  return Object.assign(suspend, state)
}

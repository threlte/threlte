import { getContext, onDestroy } from 'svelte'
import { derived, readable } from 'svelte/store'
import { suspenseContextIdentifier, type SuspenseContext } from './context'

/**
 * This hook is used to suspend the component until the promise is resolved.
 * It also works outside the boundaries of the <Suspense> component.
 */
export const useSuspense = () => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  const promises = new Set<Promise<unknown>>()

  const suspend = <T>(promise: Promise<T>): Promise<T> => {
    if (ctx) {
      ctx.suspend(promise)
      promises.add(promise)
    }
    return promise
  }

  const state = {
    suspended: derived(ctx?.suspended ?? readable(false), (suspended) => suspended)
  }

  onDestroy(() => {
    if (!ctx) return
    for (const promise of promises) {
      ctx.onComponentDestroy(promise)
    }
    promises.clear()
  })

  return Object.assign(suspend, state)
}

import { getContext, untrack } from 'svelte'
import { suspenseContextIdentifier, type SuspenseContext } from './context.svelte.js'

type Suspend = <T extends Promise<unknown>>(promise: T) => T

/**
 * This hook is used to suspend the component until the promise is resolved.
 * It also works outside the boundaries of the <Suspense> component.
 */
export const useSuspense = () => {
  const context = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  const promises = new Set<Promise<unknown>>()

  const suspend = <T extends Promise<unknown>>(promise: T): T => {
    if (context) {
      context.suspend(promise)
      promises.add(promise)
    }
    return promise
  }

  const suspended = $derived(context?.suspended.current ?? false)

  $effect(() => {
    return untrack(() => {
      if (!context) return
      for (const promise of promises) {
        context.onComponentDestroy(promise)
      }
      promises.clear()
    })
  })

  Object.defineProperty(suspend, 'suspended', {
    get() {
      return suspended
    }
  })

  return suspend as Suspend & {
    suspended: { readonly current: boolean }
  }
}

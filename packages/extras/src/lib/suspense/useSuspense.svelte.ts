import { getContext } from 'svelte'
import { suspenseContextIdentifier, type SuspenseContext } from './context.svelte.js'

type Suspend = <T extends Promise<unknown>>(promise: T) => T

/**
 * This hook is used to suspend the component until the promise is resolved.
 * It also works outside the boundaries of the <Suspense> component.
 */
export const useSuspense = () => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  const promises = new Set<Promise<unknown>>()

  const suspend = <T extends Promise<unknown>>(promise: T): T => {
    if (ctx) {
      ctx.suspend(promise)
      promises.add(promise)
    }
    return promise
  }

  const suspended = $derived(ctx?.suspended.current ?? false)

  $effect(() => {
    return () => {
      if (!ctx) return
      for (const promise of promises) {
        ctx.onComponentDestroy(promise)
      }
      promises.clear()
    }
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

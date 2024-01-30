import { getContext, onDestroy, onMount } from 'svelte'
import { derived, readable } from 'svelte/store'
import { suspenseContextIdentifier, type SuspenseContext } from './context'

let index = 0

/**
 * This hook is used to suspend the component until the promise is resolved.
 * It also works outside the boundaries of the <Suspense> component.
 */
export const useSuspense = () => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  let id = ''

  const queue: Promise<any>[] = []

  const suspend = <T extends Promise<any>>(promise: T): T => {
    // If a component id has not yet been generated, do not yet suspend.
    if (id) {
      ctx?.suspend(id, promise)
    } else {
      queue.push(promise)
    }

    return promise
  }

  const state = {
    suspended: derived(ctx?.suspended ?? readable(false), (suspended) => suspended)
  }

  // Each component requires a unique id to be generated.
  onMount(() => {
    if (!id) {
      id = `${++index}`

      for (const promise of queue) {
        ctx?.suspend(id, promise)
      }

      queue.splice(0, queue.length)
    }
  })

  onDestroy(() => {
    ctx?.onComponentDestroy(id)
  })

  return Object.assign(suspend, state)
}

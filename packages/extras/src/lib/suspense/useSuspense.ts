import { getContext } from 'svelte'
import { suspenseContextIdentifier, type SuspenseContext } from './context'

/**
 * This hook is used to suspend the component until the promise is resolved.
 * It also works outside the boundaries of the <Suspense> component.
 */
export const useSuspense = () => {
  const ctx = getContext<SuspenseContext | undefined>(suspenseContextIdentifier)

  const suspend = <T>(promise: Promise<T>): Promise<T> => {
    console.log(promise)

    ctx?.addPromise(promise)
    return promise
  }

  return suspend
}

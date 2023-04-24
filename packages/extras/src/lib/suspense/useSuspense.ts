import { getContext } from 'svelte'
import { suspenseContextIdentifier, type SuspenseContext } from './context'
import { get_current_component, onDestroy } from 'svelte/internal'

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

  onDestroy(() => {
    ctx?.onComponentDestroy(component)
  })

  return suspend
}

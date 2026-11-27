import { setContext } from 'svelte'
import { SvelteMap, SvelteSet } from 'svelte/reactivity'

export interface SuspenseContext {
  suspend: (promise: Promise<unknown>) => void
  suspended: { readonly current: boolean }
  onComponentDestroy: (promise: Promise<unknown>) => void
}

export const suspenseContextIdentifier = Symbol('THRELTE_SUSPENSE_CONTEXT_IDENTIFIER')

export const createSuspenseContext = (final: () => boolean) => {
  /**
   * This set contains all the promises that are currently being suspended.
   */
  const promises = new SvelteSet<Promise<unknown>>()

  /**
   * This map contains all the errors that were thrown during the suspension.
   */
  const errors = new SvelteMap<Promise<unknown>, Error>()

  let finalized = $state(false)

  const checkFinalized = () => {
    if (promises.size === 0 && errors.size === 0) finalized = true
  }

  /**
   * A Suspense component is suspending its children if it has any pending
   * promises or errors.
   * "suspended" means that the default slot is not rendered.
   * If the final prop is set to true, the Suspense component will not
   * suspend its children once all promises are resolved and all errors are
   * handled.
   */
  const suspended = $derived.by(() => {
    if (final() && finalized) {
      // if the suspense settled *once*, it will never suspend again.
      return false
    } else if (errors.size > 0) {
      // suspense if there are errors
      return true
    } else {
      // suspense if there are pending promises
      return promises.size > 0
    }
  })

  const errorsArray = $derived(Array.from(errors.values()))

  const context: SuspenseContext = {
    suspend(promise: Promise<unknown>) {
      promises.add(promise)

      promise
        .catch((error) => {
          errors.set(promise, error)
        })
        .finally(() => {
          promises.delete(promise)
          checkFinalized()
        })
    },
    onComponentDestroy(promise: Promise<unknown>) {
      promises.delete(promise)
      errors.delete(promise)
      checkFinalized()
    },
    suspended: {
      get current() {
        return suspended
      }
    }
  }

  setContext<SuspenseContext>(suspenseContextIdentifier, context)

  return {
    suspended: context.suspended,
    errors: {
      get current() {
        return errorsArray
      }
    }
  }
}

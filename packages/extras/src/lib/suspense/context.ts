import { currentWritable } from '@threlte/core'
import { setContext } from 'svelte'
import { derived, writable, type Readable } from 'svelte/store'

export type SuspenseContext = {
  suspend: (promise: Promise<unknown>) => void
  suspended: Readable<boolean>
  onComponentDestroy: (promise: Promise<unknown>) => void
}

export const suspenseContextIdentifier = Symbol('THRELTE_SUSPENSE_CONTEXT_IDENTIFIER')

export const createSuspenseContext = (options?: { final?: boolean }) => {
  /**
   * This set contains all the promises that are currently being suspended.
   */
  const promises = currentWritable<Set<Promise<unknown>>>(new Set())

  /**
   * This map contains all the errors that were thrown during the suspension.
   */
  const errors = currentWritable<Map<Promise<unknown>, Error>>(new Map())

  const finalized = writable<boolean>(false)
  const checkFinalized = () => {
    if (promises.current.size === 0 && errors.current.size === 0) finalized.set(true)
  }

  const finalStore = writable<boolean>(options?.final ?? false)

  const addPromise = (promise: Promise<unknown>) => {
    promises.update((set) => {
      set.add(promise)
      return set
    })
  }

  const removePromise = (promise: Promise<unknown>) => {
    promises.update((set) => {
      set.delete(promise)
      return set
    })
  }

  const addError = (promise: Promise<unknown>, error: Error) => {
    errors.update((map) => {
      map.set(promise, error)
      return map
    })
  }

  const removeError = (promise: Promise<unknown>) => {
    errors.update((map) => {
      map.delete(promise)
      return map
    })
  }

  /**
   * A Suspense component is suspending its children if it has any pending
   * promises or errors.
   * "suspended" means that the default slot is not rendered.
   * If the final prop is set to true, the Suspense component will not
   * suspend its children once all promises are resolved and all errors are
   * handled.
   */
  const suspended = derived(
    [promises, errors, finalStore, finalized],
    ([promises, errors, final, finalized]) => {
      if (final && finalized) {
        // if the suspense settled *once*, it will never suspend again.
        return false
      } else if (errors.size > 0) {
        // suspense if there are errors
        return true
      } else {
        // suspense if there are pending promises
        return promises.size > 0
      }
    }
  )

  const context: SuspenseContext = {
    suspend(promise: Promise<unknown>) {
      addPromise(promise)

      promise
        .catch((error) => {
          addError(promise, error)
        })
        .finally(() => {
          removePromise(promise)
          checkFinalized()
        })
    },
    onComponentDestroy(promise: Promise<unknown>) {
      removePromise(promise)
      removeError(promise)
      checkFinalized()
    },
    suspended
  }

  const errorsArray = derived(errors, (errors) => Array.from(errors.values()))

  setContext<SuspenseContext>(suspenseContextIdentifier, context)

  return {
    promises,
    suspended,
    errors: errorsArray,
    setFinal: (final?: boolean) => finalStore.set(final ?? false)
  }
}

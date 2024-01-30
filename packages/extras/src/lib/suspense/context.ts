import { createRawEventDispatcher, currentWritable } from '@threlte/core'
import { setContext } from 'svelte'
import { derived, writable, type Readable } from 'svelte/store'

export type SuspenseContext = {
  suspend: (id: string, promise: Promise<any>) => void
  suspended: Readable<boolean>
  onComponentDestroy: (id: string) => void
}

export const suspenseContextIdentifier = Symbol('THRELTE_SUSPENSE_CONTEXT_IDENTIFIER')

export const createSuspenseContext = (options?: { final?: boolean }) => {
  const dispatch = createRawEventDispatcher<{
    error: Error
  }>()

  /**
   * This map contains all the promises that are currently being suspended.
   */
  const promises = currentWritable<Map<string, Set<Promise<any>>>>(new Map())

  /**
   * This map contains all the errors that were thrown during the suspension.
   */
  const errors = currentWritable<Map<string, Error[]>>(new Map())

  const finalized = writable<boolean>(false)
  const checkFinalized = () => {
    if (promises.current.size === 0 && errors.current.size === 0) finalized.set(true)
  }

  const finalStore = writable<boolean>(options?.final ?? false)

  const addPromise = (id: string, promise: Promise<any>) => {
    promises.update((map) => {
      if (map.has(id)) {
        map.get(id)?.add(promise)
      } else {
        map.set(id, new Set([promise]))
      }
      return map
    })
  }
  const removePromise = (id: string, promise: Promise<any>) => {
    promises.update((map) => {
      if (map.has(id)) {
        map.get(id)?.delete(promise)
      }
      if (map.get(id)?.size === 0) {
        map.delete(id)
      }
      return map
    })
  }
  const addError = (id: string, error: Error) => {
    errors.update((map) => {
      if (map.has(id)) {
        map.get(id)?.push(error)
      } else {
        map.set(id, [error])
      }
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
    suspend(id: string, promise: Promise<any>) {
      addPromise(id, promise)
      promise
        .then(() => {
          if (promises.current.get(id)?.has(promise)) {
            removePromise(id, promise)
          }
        })
        .catch((error) => {
          if (promises.current.get(id)?.has(promise)) {
            removePromise(id, promise)
            addError(id, error)
            dispatch('error', error)
          }
        })
        .finally(() => {
          checkFinalized()
        })
    },
    onComponentDestroy(id: string) {
      promises.update((map) => {
        map.delete(id)
        return map
      })
      errors.update((map) => {
        map.delete(id)
        return map
      })
      checkFinalized()
    },
    suspended
  }

  const errorsArray = derived(errors, (errors) => Array.from(errors.values()).flat())

  setContext<SuspenseContext>(suspenseContextIdentifier, context)

  return {
    promises,
    suspended,
    errors: errorsArray,
    setFinal: (final?: boolean) => finalStore.set(final ?? false)
  }
}

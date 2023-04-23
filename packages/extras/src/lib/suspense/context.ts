import { createRawEventDispatcher, currentWritable } from '@threlte/core'
import { setContext } from 'svelte'
import type { SvelteComponentDev } from 'svelte/internal'
import { derived, writable } from 'svelte/store'

export type SuspenseContext = {
  suspend: (component: SvelteComponentDev, promise: Promise<any>) => void
  onComponentDestroy: (component: SvelteComponentDev) => void
}

export const suspenseContextIdentifier = Symbol('THRELTE_SUSPENSE_CONTEXT_IDENTIFIER')

export const createSuspenseContext = (options?: { final?: boolean }) => {
  const dispatch = createRawEventDispatcher<{
    error: Error
  }>()

  /**
   * This map contains all the promises that are currently being suspended.
   */
  const promises = currentWritable<Map<SvelteComponentDev, Set<Promise<any>>>>(new Map())

  /**
   * This map contains all the errors that were thrown during the suspension.
   */
  const errors = currentWritable<Map<SvelteComponentDev, Error[]>>(new Map())

  const finalized = writable<boolean>(false)
  const checkFinalized = () => {
    if (promises.current.size === 0 && errors.current.size === 0) finalized.set(true)
  }

  const finalStore = writable<boolean>(options?.final ?? false)

  const addPromise = (component: SvelteComponentDev, promise: Promise<any>) => {
    promises.update((map) => {
      if (map.has(component)) {
        map.get(component)?.add(promise)
      } else {
        map.set(component, new Set([promise]))
      }
      return map
    })
  }
  const removePromise = (component: SvelteComponentDev, promise: Promise<any>) => {
    promises.update((map) => {
      if (map.has(component)) {
        map.get(component)?.delete(promise)
      }
      if (map.get(component)?.size === 0) {
        map.delete(component)
      }
      return map
    })
  }
  const addError = (component: SvelteComponentDev, error: Error) => {
    errors.update((map) => {
      if (map.has(component)) {
        map.get(component)?.push(error)
      } else {
        map.set(component, [error])
      }
      return map
    })
  }

  const context: SuspenseContext = {
    suspend(component: SvelteComponentDev, promise: Promise<any>) {
      addPromise(component, promise)
      promise
        .then(() => {
          removePromise(component, promise)
          checkFinalized()
        })
        .catch((error) => {
          if (promises.current.has(component) && promises.current.get(component)?.has(promise)) {
            removePromise(component, promise)
            addError(component, error)
            dispatch('error', error)
          }
        })
    },
    onComponentDestroy(component: SvelteComponentDev) {
      promises.update((map) => {
        map.delete(component)
        return map
      })
      errors.update((map) => {
        map.delete(component)
        return map
      })
      checkFinalized()
    }
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

  const errorsArray = derived(errors, (errors) => Array.from(errors.values()).flat())

  setContext<SuspenseContext>(suspenseContextIdentifier, context)

  return {
    promises,
    suspended,
    errors: errorsArray,
    setFinal: (final?: boolean) => finalStore.set(final ?? false)
  }
}

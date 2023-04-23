import { setContext } from 'svelte'
import { derived, writable } from 'svelte/store'

export type SuspenseContext = {
  addPromise: (promise: Promise<any>) => void
}

export const suspenseContextIdentifier = Symbol('THRELTE_SUSPENSE_CONTEXT_IDENTIFIER')

export const createSuspenseContext = () => {
  const promises = writable<Set<Promise<any>>>(new Set())
  const errors = writable<Set<Error>>(new Set())

  const context: SuspenseContext = {
    addPromise(promise: Promise<any>) {
      promises.update((set) => {
        set.add(promise)
        return set
      })
      promise
        .then(() => {
          promises.update((set) => {
            set.delete(promise)
            return set
          })
        })
        .catch((error) => {
          errors.update((set) => {
            set.add(error)
            return set
          })
          promises.update((set) => {
            set.delete(promise)
            return set
          })
        })
    }
  }

  const suspended = derived(promises, (promises) => promises.size > 0)

  setContext<SuspenseContext>(suspenseContextIdentifier, context)

  return {
    promises,
    suspended,
    errors
  }
}

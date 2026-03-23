export type AsyncState<T> = {
  current: T | undefined
  error: Error | undefined
} & Promise<T>

/**
 * ### `asyncState`
 *
 * Creates a writable store that is initialized with a promise. The store also
 * implements the `then` and `catch` methods of the promise so that it can be
 * used in `await` expressions and `{#await}` blocks of Svelte.
 *
 * ```svelte
 * <script>
 *  import { asyncState } from '@threlte/core'
 *
 *  const asyncOp = async () => {
 *    // Do something async
 *  }
 *
 *  const store = asyncState(asyncOp())
 *  $: console.log($store) // asyncOp result
 * </script>
 *
 * <h1>
 *  {#await store then data}
 *    // Do something with the data
 *  {/await}
 * </h1>
 * ```
 *
 * If an error occurs in the promise, the error will be logged to the console
 * and the error can be accessed via the `error` property of the store with in
 * turn is a store.
 *
 * ```svelte
 * <script>
 *  import { asyncState } from '@threlte/core'
 *
 *  const asyncOp = async () => {
 *    throw new Error('Something went wrong')
 *  }
 *
 *  const store = asyncState(asyncOp())
 *  const error = store.error
 *
 *  $: console.log($store) // undefined
 *  $: console.log($error) // Error: Something went wrong
 * </script>
 * ```
 */
export const asyncState = <T>(promise: Promise<T>): AsyncState<T> => {
  let current = $state.raw<T>()
  let error = $state.raw<Error>()

  promise
    .then((result) => {
      current = result
    })
    .catch((promiseError) => {
      console.error('Error in asyncState:', promiseError)
      error = promiseError
    })

  Object.defineProperty(promise, 'current', {
    get() {
      return current
    }
  })

  Object.defineProperty(promise, 'error', {
    get() {
      return error
    }
  })

  return promise as AsyncState<T>
}

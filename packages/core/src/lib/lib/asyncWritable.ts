import { writable, type Writable } from 'svelte/store'

export type AsyncWritable<T> = Writable<T | undefined> & {
  promise: Promise<T>
  error: Writable<Error | undefined>
} & Promise<T>

/**
 * ### `asyncWritable`
 *
 * Creates a writable store that is initialized with a promise. The store also
 * implements the `then` and `catch` methods of the promise so that it can be
 * used in `await` expressions and `{#await}` blocks of Svelte.
 *
 * ```svelte
 * <script>
 *  import { asyncWritable } from '@threlte/core'
 *
 *  const asyncOp = async () => {
 *    // Do something async
 *  }
 *
 *  const store = asyncWritable(asyncOp())
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
 *  import { asyncWritable } from '@threlte/core'
 *
 *  const asyncOp = async () => {
 *    throw new Error('Something went wrong')
 *  }
 *
 *  const store = asyncWritable(asyncOp())
 *  const error = store.error
 *
 *  $: console.log($store) // undefined
 *  $: console.log($error) // Error: Something went wrong
 * </script>
 * ```
 */
export const asyncWritable = <T>(promise: Promise<T>): AsyncWritable<T> => {
  const store = writable<T | undefined>(undefined)
  const error = writable<Error | undefined>(undefined)

  promise
    .then((result) => {
      store.set(result)
    })
    .catch((e) => {
      console.error('Error in asyncWritable:', e.message)
      error.set(e)
    })

  return Object.assign(Object.assign(promise, store), { error, promise })
}

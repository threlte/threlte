import { onDestroy } from 'svelte'
import { derived, type Readable } from 'svelte/store'

type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>

type StoresValues<T> =
  T extends Readable<infer U>
    ? U
    : {
        [K in keyof T]: T[K] extends Readable<infer U> ? U : never
      }

type MaybePromise<T> = T | Promise<T>

type CleanupFn = () => MaybePromise<void>
type CallbackFn<T> = (values: T) => MaybePromise<void | CleanupFn>
/**
 * ### `watch`
 *
 * Watch a single store or multiple stores and call a callback when they change to trigger side effects.
 * The callback can return a cleanup function that will be called when the stores change again or when the component is destroyed.
 *
 * ```ts
 * const store = writable(0)
 *
 * watch(store, (value) => {
 * 	console.log(value) // 0
 * })
 * ```
 *
 * You can also watch multiple stores:
 *
 * ```ts
 * const store1 = writable(0)
 * const store2 = writable(1)
 *
 * watch([store1, store2], ([value1, value2]) => {
 * 	console.log(value1, value2) // 0 1
 * })
 * ```
 *
 * The callback can return a cleanup function that will be called when the stores change again or when the component is destroyed.
 *
 * ```ts
 * const store = writable(0)
 *
 * watch(store, (value) => {
 * 	console.log(value) // 0
 * 	return () => {
 * 		console.log('cleanup')
 * 	}
 * })
 * ```
 *
 * @param stores
 * @param callback
 */
export const watch = <S extends Stores>(stores: S, callback: CallbackFn<StoresValues<S>>): void => {
  const d = derived(stores, (values) => {
    return values
  })

  let cleanupFn: CleanupFn

  const unsubscribe = d.subscribe(async (values) => {
    if (cleanupFn) cleanupFn()
    const fn = await callback(values)
    if (fn) cleanupFn = fn
  })

  onDestroy(() => {
    unsubscribe()
    if (cleanupFn) cleanupFn()
  })
}

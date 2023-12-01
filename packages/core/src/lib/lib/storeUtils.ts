import { onDestroy } from 'svelte'
import { derived, writable, type Readable, type Writable } from 'svelte/store'

type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>

type StoresValues<T> = T extends Readable<infer U>
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

/**
 * ### `memoize`
 *
 * Use a single store or multiple stores and return the value(s) as an object.
 * This is useful for using stores in a non-reactive way e.g. in loops.
 *
 * ```ts
 * const store = writable(0)
 * const memoized = memoize(store) // { current: 0 }
 *
 * useTask(() => {
 * 	store.update(n => n + 1)
 * 	console.log(memoized.current) // 1, 2, 3, ...
 * })
 * ```
 *
 * You can also pass a transform function to transform the values:
 *
 * ```ts
 * const store = writable(0)
 * const doubled = memoize(store, n => n * 2) // { current: 0 }
 *
 * useTask(() => {
 * 	store.update(n => n + 1)
 * 	console.log(doubled.current) // 2, 4, 6, ...
 * })
 * ```
 *
 * @param stores
 * @param transform
 */
export function memoize<U, S extends Stores>(stores: S): { current: StoresValues<S> }
export function memoize<U, S extends Stores>(
  stores: S,
  transform: (values: StoresValues<S>) => U
): { current: U }
export function memoize<U, S extends Stores>(
  stores: S,
  transform?: (values: StoresValues<S>) => U
): { current: U | StoresValues<S> } {
  const obj = {
    current: undefined
  } as any

  watch(stores, (v) => {
    obj.current = transform ? transform(v) : v
  })

  return obj
}

export type CurrentWritable<T = unknown> = Writable<T> & { current: T }

/**
 * ### `currentWritable`
 *
 * A writable store that also has a `current` property that is updated synchronously.
 * For use in non-reactive contexts e.g. loops where unwrapping a store every frame is expensive.
 *
 * ```ts
 * const store = currentWritable(0)
 *
 * useTask(() => {
 * 	console.log(store.current) // 0
 * })
 *
 * @param value
 * @returns
 */
export const currentWritable = <T>(value: T): CurrentWritable<T> => {
  const store = writable<T>(value)

  const extendedWritable = {
    set: (value: T) => {
      extendedWritable.current = value
      store.set(value)
    },
    subscribe: store.subscribe,
    update: (fn: (value: T) => T) => {
      const newValue = fn(extendedWritable.current)
      extendedWritable.current = newValue
      store.set(newValue)
    },
    current: value
  }

  return extendedWritable
}

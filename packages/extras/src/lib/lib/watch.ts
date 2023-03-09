import { onDestroy } from 'svelte'
import { derived, type Readable } from 'svelte/store'

type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>

type StoresValues<T> = T extends Readable<infer U>
  ? U
  : {
      [K in keyof T]: T[K] extends Readable<infer U> ? U : never
    }

/**
 * Watch a single store or multiple stores and call a callback when they change.
 * The callback can return a cleanup function that will be called when the stores change again.
 * @param stores
 * @param callback
 */
export const watch = <S extends Stores>(
  stores: S,
  callback: (values: StoresValues<S>) => (() => void) | void
): void => {
  const d = derived(stores, (values) => {
    return values
  })

  let cleanupFn: () => void

  const unsubscribe = d.subscribe((values) => {
    if (cleanupFn) cleanupFn()
    const fn = callback(values)
    if (fn) cleanupFn = fn
  })

  onDestroy(() => {
    unsubscribe()
    if (cleanupFn) cleanupFn()
  })
}

import { onDestroy } from 'svelte'
import { get, type Readable, type Writable } from 'svelte/store'

type EqualityFn<T> = (newValue: T, oldValue: T) => boolean

export const useOnStoreChange = <T>(
  store: Writable<T> | Readable<T>,
  callback: (newValue: T, oldValue: T) => Promise<void> | void,
  options?: {
    equalityFn: EqualityFn<T>
  }
): void => {
  let oldValue: T = get(store)
  let initialized = false

  const unsubscribe = store.subscribe(async (newValue) => {
    if (!initialized) {
      oldValue = newValue
      initialized = true
      return
    }
    if (options?.equalityFn && !options.equalityFn(newValue, oldValue)) {
      await callback(newValue, oldValue)
    } else {
      await callback(newValue, oldValue)
    }
    oldValue = newValue
  })

  onDestroy(unsubscribe)
}

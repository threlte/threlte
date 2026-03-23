import { writable, type Readable, type Writable } from 'svelte/store'

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

export type CurrentReadable<T = unknown> = Readable<T> & { current: T }

export const toCurrentReadable = <T>(store: CurrentWritable<T>): CurrentReadable<T> => {
  return {
    subscribe: store.subscribe,
    get current() {
      return store.current
    }
  }
}

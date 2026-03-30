import { untrack } from 'svelte'
import { toStore, writable, type Readable, type Writable } from 'svelte/store'

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

/**
 * ### `runeToCurrentWritable`
 *
 * Bridges a Svelte 5 `$state` rune into the `CurrentWritable` interface,
 * allowing rune-backed state to be consumed as a store by legacy or
 * store-aware code.
 *
 * Pass the getter and setter of a `$state` variable:
 *
 * ```ts
 * let count = $state(0)
 *
 * const store = runeToCurrentWritable(
 *   () => count,
 *   (v) => { count = v }
 * )
 *
 * store.subscribe((v) => console.log(v)) // reacts to rune changes
 * store.set(1)                           // writes back to the rune
 * console.log(store.current)             // synchronous read, no overhead
 * ```
 *
 * The `.current` property reads the rune directly and is always in sync.
 * `.subscribe` is powered by `toStore`, which tracks the getter reactively
 * via `$effect`.
 */
export const runeToCurrentWritable = <T>(get: () => T, set: (value: T) => void): CurrentWritable<T> => {
  const store = toStore(get, set)
  return {
    subscribe: store.subscribe,
    set,
    update: (fn: (value: T) => T) => set(fn(untrack(get))),
    get current() {
      return untrack(get)
    }
  }
}

/**
 * ### `runeToCurrentReadable`
 *
 * Bridges a Svelte 5 `$state` or `$derived` rune into the `CurrentReadable`
 * interface, allowing rune-backed reactive values to be consumed as read-only
 * stores by legacy or store-aware code.
 *
 * Pass the getter of a `$state` or `$derived` variable:
 *
 * ```ts
 * let count = $state(0)
 * const doubled = $derived(count * 2)
 *
 * const store = runeToCurrentReadable(() => doubled)
 *
 * store.subscribe((v) => console.log(v)) // reacts to rune changes
 * console.log(store.current)             // synchronous read, no overhead
 * ```
 *
 * Use this over `runeToCurrentWritable` when the value is derived or when
 * external writes should not be allowed — for example, renderer settings
 * that are owned by `<Canvas>` props.
 *
 * The `.current` property reads the rune directly and is always in sync.
 * `.subscribe` is powered by `toStore`, which tracks the getter reactively
 * via `$effect`.
 */
export const runeToCurrentReadable = <T>(get: () => T): CurrentReadable<T> => {
  const { subscribe } = toStore(get)
  return {
    subscribe,
    get current() {
      return untrack(get)
    }
  }
}

export const toCurrentReadable = <T>(store: CurrentWritable<T>): CurrentReadable<T> => {
  return {
    subscribe: store.subscribe,
    get current() {
      return store.current
    }
  }
}

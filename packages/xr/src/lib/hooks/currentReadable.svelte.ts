import { untrack } from 'svelte'
import { type Readable, toStore } from 'svelte/store'

export type CurrentReadable<T> = Readable<T> & {
  current: T
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

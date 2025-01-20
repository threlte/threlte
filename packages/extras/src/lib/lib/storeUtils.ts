import type { Readable } from 'svelte/store'
import type { CurrentWritable } from '@threlte/core'

export type CurrentReadable<T = unknown> = Readable<T> & { current: T }

export const toCurrentReadable = <T>(store: CurrentWritable<T>): CurrentReadable<T> => {
  return {
    subscribe: store.subscribe,
    get current() {
      return store.current
    }
  }
}

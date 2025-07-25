import { type Readable, toStore } from 'svelte/store'

export type CurrentReadable<T> = Readable<T> & {
  current: T
}

export const toCurrentReadable = <T>(getter: () => T) => {
  const store = toStore(getter) as CurrentReadable<T>
  store.current = getter()

  $effect.pre(() => {
    return store.subscribe((value) => {
      store.current = value
    })
  })

  return store
}

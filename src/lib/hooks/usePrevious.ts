import { onDestroy } from 'svelte'
import { writable, derived } from 'svelte/store'
import type { Readable, Writable } from 'svelte/store'

export type UsePreviousResult<T> = {
  previous: Readable<T | undefined>
  current: Writable<T>
}

export const usePrevious = <T>(
  initial: T,
  equalityFn?: (a: T, b: T) => boolean
): UsePreviousResult<T> => {
  const current = writable(initial)

  const arr = writable<[T, T | undefined]>([initial, undefined])

  const previous = derived(arr, (value) => {
    return value[1]
  })

  const onCurrentChange = (value: T) => {
    arr.update(([current, old]) => {
      if (equalityFn && equalityFn(value, current)) return [current, old]
      return [value, current]
    })
  }

  const unsubCurrent = current.subscribe(onCurrentChange)
  onDestroy(unsubCurrent)

  return {
    current,
    previous
  }
}

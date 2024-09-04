import { onDestroy, onMount } from 'svelte'
import type { CreateEvent, MaybeInstance } from '../types'

export const useCreateEvent = <T>(oncreate?: CreateEvent<T>) => {
  let cleanupFunction: (() => void) | void

  let ref: MaybeInstance<T> | undefined = undefined
  let mounted = false

  const dispatchCreateEvent = () => {
    cleanupFunction?.()
    cleanupFunction = oncreate?.(ref!)
  }

  const updateRef = (newRef: MaybeInstance<T>) => {
    ref = newRef
    if (!mounted) return
    dispatchCreateEvent()
  }

  onMount(() => {
    dispatchCreateEvent()
    mounted = true
  })

  onDestroy(() => cleanupFunction?.())

  return {
    updateRef
  }
}

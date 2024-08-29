import { onDestroy, onMount } from 'svelte'
import type { CreateEvent } from '../types'

export const useCreateEvent = <T>(oncreate?: CreateEvent<T>) => {
  const cleanupFunctions: (() => void)[] = []

  let ref: T | undefined = undefined
  let mounted = false

  const dispatchCreateEvent = () => {
    // call every cleanup function
    cleanupFunctions.forEach((cleanup) => cleanup())

    // clear the cleanup functions array
    cleanupFunctions.length = 0

    const cleanup = oncreate?.(ref)
    if (cleanup !== undefined) {
      cleanupFunctions.push(cleanup)
    }
  }

  const updateRef = (newRef: T) => {
    ref = newRef
    if (!mounted) return
    dispatchCreateEvent()
  }

  onMount(() => {
    dispatchCreateEvent()
    mounted = true
  })

  onDestroy(() => {
    // call every cleanup function
    cleanupFunctions.forEach((cleanup) => cleanup())
  })

  return {
    updateRef
  }
}

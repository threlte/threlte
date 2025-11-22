import { onDestroy } from 'svelte'
import type { CreateEvent } from '../types/types.js'

export const useCreateEvent = <T>(oncreate?: CreateEvent<T>['oncreate']) => {
  const cleanupFunctions: (() => void)[] = []

  let ref: T

  const dispatchCreateEvent = () => {
    // call every cleanup function
    cleanupFunctions.forEach((cleanup) => cleanup())

    // clear the cleanup functions array
    cleanupFunctions.length = 0

    if (ref === undefined) return

    const cleanup = oncreate?.(ref)
    if (cleanup) cleanupFunctions.push(cleanup)
  }

  const updateRef = (newRef: T) => {
    ref = newRef
    dispatchCreateEvent()
  }

  onDestroy(() => {
    // call every cleanup function
    cleanupFunctions.forEach((cleanup) => cleanup())
  })

  return {
    updateRef
  }
}

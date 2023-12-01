import { onDestroy } from 'svelte'
import { createRawEventDispatcher } from '@threlte/core'

export const useCreateEvent = <T>() => {
  const dispatchRaw = createRawEventDispatcher<{
    create: {
      ref: T
      cleanup: (callback: () => void) => void
    }
  }>()

  const cleanupFunctions: (() => void)[] = []

  let ref: T | undefined = undefined

  const dispatchCreateEvent = () => {
    // call every cleanup function
    cleanupFunctions.forEach((cleanup) => cleanup())

    // clear the cleanup functions array
    cleanupFunctions.length = 0

    const cleanup = (callback: () => void) => {
      // add cleanup function to array
      cleanupFunctions.push(callback)
    }

    if (ref === undefined) return

    dispatchRaw('create', { ref, cleanup })
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

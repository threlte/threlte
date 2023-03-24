import { onDestroy, onMount } from 'svelte'
import { createRawEventDispatcher } from '../../../lib/createRawEventDispatcher'

export const useCreateEvent = () => {
  const dispatchRaw = createRawEventDispatcher<{
    create: {
      ref: any
      cleanup: (callback: () => void) => void
    }
  }>()

  const cleanupFunctions: (() => void)[] = []

  let ref: any | undefined = undefined
  let mounted = false

  const dispatchCreateEvent = () => {
    // call every cleanup function
    cleanupFunctions.forEach((cleanup) => cleanup())

    // clear the cleanup functions array
    cleanupFunctions.length = 0

    const cleanup = (callback: () => void) => {
      // add cleanup function to array
      cleanupFunctions.push(callback)
    }

    dispatchRaw('create', { ref, cleanup })
  }

  const updateRef = (newRef: any) => {
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

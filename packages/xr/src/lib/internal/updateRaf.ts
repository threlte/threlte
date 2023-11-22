// @ts-expect-error svelte/internal is untyped.
import { set_raf } from 'svelte/internal'
import { onMount } from 'svelte'
import { watch } from '@threlte/core'
import { session } from './stores'

export const updateRaf = () => {
  if (typeof window === undefined) return

  const browserRaf = (fn: FrameRequestCallback) => requestAnimationFrame(fn)
  const currentRaf = { fn: browserRaf }

  set_raf((fn: FrameRequestCallback) => currentRaf.fn(fn))

  onMount(() => {
    return () => (currentRaf.fn = browserRaf)
  })

  watch(session, (session) => {
    if (session) {
      currentRaf.fn = (fn: XRFrameRequestCallback) => (
        session.requestAnimationFrame(fn)
      )
    } else {
      currentRaf.fn = browserRaf
    }
  })
}

// @ts-expect-error svelte/internal is untyped.
import { set_raf } from 'svelte/internal'
import { onDestroy } from 'svelte'
import { watch } from '@threlte/core'
import { session } from './stores'

export const updateRaf = () => {
  if (typeof window === 'undefined') return

  const browserRaf = (fn: FrameRequestCallback) => requestAnimationFrame(fn)
  const currentRaf = { fn: browserRaf }
  set_raf((fn: FrameRequestCallback) => currentRaf.fn(fn))

  watch(session, (session) => {
    if (session) {
      currentRaf.fn = (fn: XRFrameRequestCallback) => (
        session.requestAnimationFrame(fn)
      )
    } else {
      currentRaf.fn = browserRaf
    }
  })

	onDestroy(() => (currentRaf.fn = browserRaf))
}

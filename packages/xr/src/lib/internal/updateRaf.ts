import { set_raf } from 'svelte/internal'
import { onDestroy } from 'svelte'
import { watch } from '@threlte/core'
import { session } from './stores'

export const updateRaf = () => {
  if (typeof window === 'undefined') return

  const currentRaf = { fn: window.requestAnimationFrame }
  set_raf((fn: FrameRequestCallback) => currentRaf.fn(fn))

  watch(session, (session) => {
    if (session) {
      currentRaf.fn = session.requestAnimationFrame
    } else {
      currentRaf.fn = window.requestAnimationFrame
    }
    console.log(currentRaf.fn)
  })

	// set_now(() => Date.now())

	onDestroy(() => (currentRaf.fn = window.requestAnimationFrame))
}

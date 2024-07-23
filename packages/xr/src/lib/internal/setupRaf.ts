import { onDestroy } from 'svelte'
// @ts-expect-error untyped internal import, when have you ever done me wrong?
import { raf } from 'svelte/internal/client'
import { watch } from '@threlte/core'
import { session } from './stores'

export const setupRaf = () => {
  if (typeof window === 'undefined') return

  const originalTick = raf.tick

  watch(session, (session) => {
    raf.tick =
      session === undefined
        ? originalTick
        : (fn: XRFrameRequestCallback) => session.requestAnimationFrame(fn)
  })

  onDestroy(() => (raf.tick = originalTick))
}

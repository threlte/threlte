import { session } from './state.svelte.js'
import { raf } from './raf.js'

export const setupRaf = () => {
  if (typeof window === 'undefined') return

  $effect.pre(() => {
    const currentSession = session.current

    if (currentSession === undefined) {
      return
    }

    const originalTick = raf.tick

    raf.tick = (fn: XRFrameRequestCallback) => currentSession.requestAnimationFrame(fn)

    return () => {
      raf.tick = originalTick
    }
  })
}

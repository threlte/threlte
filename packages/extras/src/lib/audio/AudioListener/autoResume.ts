/**
 * Browser autoplay policies keep an `AudioContext` in `suspended` state until
 * the user has interacted with the page. THREE's `AudioContext` is a module
 * singleton (every `AudioListener` shares it), so we only need one set of
 * gesture listeners per page — refcounted across all `<AudioListener
 * autoResume>` consumers. The listeners remove themselves as soon as any
 * gesture fires (context resumes for every listener at once); if every
 * consumer unmounts first, we clean up so no handlers dangle on `window`.
 */

const gestureEvents = ['click', 'keydown', 'touchstart', 'pointerdown'] as const

let activeCount = 0
let removeListeners: (() => void) | null = null

export const acquireAutoResume = (context: AudioContext): (() => void) => {
  activeCount += 1

  if (removeListeners === null && context.state !== 'running') {
    const handler = () => {
      context.resume().catch(() => {
        // resume() rejects if the context is closed; nothing to do
      })
      removeListeners?.()
    }

    for (const event of gestureEvents) {
      window.addEventListener(event, handler, { passive: true })
    }

    removeListeners = () => {
      for (const event of gestureEvents) {
        window.removeEventListener(event, handler)
      }
      removeListeners = null
    }
  }

  return () => {
    activeCount -= 1
    if (activeCount === 0) removeListeners?.()
  }
}

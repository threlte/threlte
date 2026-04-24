import type { WebXRManager } from 'three'
import { isPresenting, isHandTracking, session, xr } from '../internal/state.svelte.js'
import { runeToCurrentReadable, type CurrentReadable } from './currentReadable.svelte.js'

/**
 * Provides access to context related to `<XR />`.
 */
export const useXR = (): {
  isPresenting: CurrentReadable<boolean>
  isHandTracking: CurrentReadable<boolean>
  session: CurrentReadable<XRSession | undefined>
  xr: CurrentReadable<WebXRManager | undefined>
} => {
  return {
    isPresenting: runeToCurrentReadable(() => isPresenting.current),
    isHandTracking: runeToCurrentReadable(() => isHandTracking.current),
    session: runeToCurrentReadable(() => session.current),
    xr: runeToCurrentReadable(() => xr.current)
  }
}

import type { WebXRManager } from 'three'
import { isPresenting, isHandTracking, session, xr } from '../internal/state.svelte.js'
import { toCurrentReadable, type CurrentReadable } from './currentReadable.svelte.js'

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
    isPresenting: toCurrentReadable(() => isPresenting.current),
    isHandTracking: toCurrentReadable(() => isHandTracking.current),
    session: toCurrentReadable(() => session.current),
    xr: toCurrentReadable(() => xr.current)
  }
}

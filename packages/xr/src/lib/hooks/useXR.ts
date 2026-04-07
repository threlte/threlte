import type { WebXRManager } from 'three'
import { isPresenting, isHandTracking, session, xr } from '../internal/state.svelte.js'

/**
 * Provides access to context related to `<XR />`.
 */
export const useXR = (): {
  isPresenting: { readonly current: boolean }
  isHandTracking: { readonly current: boolean }
  session: { readonly current: XRSession | undefined }
  xr: { readonly current: WebXRManager | undefined }
} => {
  return {
    isPresenting: {
      get current() {
        return isPresenting.current
      }
    },
    isHandTracking: {
      get current() {
        return isHandTracking.current
      }
    },
    session: {
      get current() {
        return session.current
      }
    },
    xr: {
      get current() {
        return xr.current
      }
    }
  }
}

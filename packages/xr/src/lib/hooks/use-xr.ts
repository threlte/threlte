import type { CurrentWritable } from '@threlte/core'
import {
  isPresenting,
  isHandTracking,
  session,
  xr
} from '$lib/internal/stores'

const stores = {
  isPresenting,
  isHandTracking,
  session,
  xrFrame: {
    get current() {
      return xr.current!.getFrame()
    },
  },
}

/**
 * Provides access to context related to `<XR />`.
 */
export const useXR = (): {
  isPresenting: CurrentWritable<boolean>
  isHandTracking: CurrentWritable<boolean>
  session: CurrentWritable<XRSession | undefined>
  xrFrame: { current: XRFrame }
} => stores

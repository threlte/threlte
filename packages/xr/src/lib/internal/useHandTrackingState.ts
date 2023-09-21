import { useThrelte } from '@threlte/core'

/**
 * There are some cases where we need to know if hand tracking is now active before an input source
 * connection or disconnection event. This is the way to do that.
 */
export const useHandTrackingState = () => {
  const { xr } = useThrelte().renderer

  return () => {
    let handTracking = false
    xr.getSession()?.inputSources.forEach((value) => {
      if (value.hand) {
        handTracking = true
      }
    })
    return handTracking
  }
}

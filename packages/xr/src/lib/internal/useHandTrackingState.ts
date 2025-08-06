import { useThrelte } from '@threlte/core'

/**
 * There are some cases where we need to know if hand tracking is now active before an input source
 * connection or disconnection event. This is the way to do that.
 */
export const useHandTrackingState = () => {
  const { renderer } = useThrelte()

  return () => {
    const sources = renderer.xr.getSession()?.inputSources

    if (sources === undefined) {
      return false
    }

    for (const source of sources) {
      if (source.hand !== undefined) {
        return true
      }
    }

    return false
  }
}

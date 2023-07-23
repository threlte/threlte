import {
  isPresenting,
  isHandTracking,
  player,
  session,
  xrFrame,
} from '$lib/stores'

const stores = {
  isPresenting,
  isHandTracking,
  player,
  session,
  xrFrame,
}

/**
 * This hook gives you access to the current state configured by `<XR />`.
 */
export const useXR = () => stores

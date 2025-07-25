import type { WebXRManager } from 'three'
import { isPresenting, isHandTracking, session, xr } from '../internal/state.svelte'
import { toStore, type Readable } from 'svelte/store'

const stores = {
  isPresenting: toStore(() => isPresenting.current),
  isHandTracking: toStore(() => isHandTracking.current),
  session: toStore(() => session.current),
  xr: toStore(() => xr.current)
}

/**
 * Provides access to context related to `<XR />`.
 */
export const useXR = (): {
  isPresenting: Readable<boolean>
  isHandTracking: Readable<boolean>
  session: Readable<XRSession | undefined>
  xr: Readable<WebXRManager | undefined>
} => stores

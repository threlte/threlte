import type { Group } from 'three'

interface Context {
  current: Group | undefined
}

class XROriginState {
  current = $state.raw<Group>()
}

const origin = new XROriginState()

/**
 * Returns XR-scoped origin state for the current `<XR>` tree. `current` is the
 * mounted `<XROrigin>` group when present, otherwise `undefined`.
 */
export const useXROrigin = (): Context => {
  return origin
}

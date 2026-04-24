import type { Group } from 'three'

class XROriginState {
  current = $state.raw<Group>()
}

export const xrOrigin = new XROriginState()

/**
 * Returns the currently mounted `<XROrigin>` group, or `undefined` when no
 * XROrigin is mounted.
 */
export const useXROrigin = (): Group | undefined => xrOrigin.current

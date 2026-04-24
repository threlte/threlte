import { getContext, setContext } from 'svelte'
import type { Group } from 'three'

const key = Symbol('xr-origin')

/**
 * Returns the `<XROrigin>` group from the nearest ancestor, or `undefined`
 * when no `<XROrigin>` is in scope (e.g. default setup — controllers and hands
 * attach to the scene root).
 */
export const useXROrigin = (): Group | undefined => {
  return getContext(key)
}

/**
 * @internal — used by `<XROrigin>` to expose itself to descendants.
 */
export const setXROriginContext = (origin: Group) => {
  setContext(key, origin)
}

import { getContext, setContext } from 'svelte'
import type { Group } from 'three'

const key = Symbol('xr-origin-context')

interface Context {
  current: Group | undefined
}

class XROriginState {
  current = $state.raw<Group>()
}

export const provideXROrigin = (): void => {
  setContext<Context>(key, new XROriginState())
}

/**
 * Returns XR-scoped origin state for the current `<XR>` tree. `current` is the
 * mounted `<XROrigin>` group when present, otherwise `undefined`.
 */
export const useXROrigin = (): Context => {
  const context = getContext<Context>(key)

  if (!context) {
    throw new Error(
      'useXROrigin(): No XR origin context found. Did you forget to call this within an `<XR>` component tree?'
    )
  }

  return context
}

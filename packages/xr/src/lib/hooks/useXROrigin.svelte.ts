import { getContext, setContext } from 'svelte'
import type { Group } from 'three'

const key = Symbol('xr-origin-context')

interface Context {
  current: Group | undefined
}

export const provideXROrigin = (ref: () => Group): void => {
  setContext<Context>(key, {
    get current() {
      return ref()
    }
  })
}

/**
 * Returns the nearest parent `<XROrigin>` group, or `undefined` when no
 * `<XROrigin>` exists in the current component ancestry.
 */
export const useXROrigin = (): Context => getContext<Context>(key) ?? { current: undefined }

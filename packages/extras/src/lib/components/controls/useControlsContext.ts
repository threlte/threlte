import { setThrelteUserContext, useThrelteUserContext, type CurrentWritable } from '@threlte/core'
import { get, writable, type Writable } from 'svelte/store'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type ControlsContext = {
  orbitControls: Writable<OrbitControls | undefined>
}

/**
 * ### `useControlsContext`
 *
 * This hook is used to register the `OrbitControls` instance with the
 * `ControlsContext`. We're using this context to enable and disable the
 * controls when the user is interacting with the TransformControls.
 */
export const useControlsContext = (): ControlsContext => {
  const controlsContextStore = useThrelteUserContext<ControlsContext>('threlte-controls')

  const controlsContext = get(controlsContextStore)
  if (controlsContext) return controlsContext

  const newControlsContext: ControlsContext = {
    orbitControls: writable<OrbitControls | undefined>(undefined)
  }

  setThrelteUserContext<ControlsContext>('threlte-controls', newControlsContext)

  return newControlsContext
}

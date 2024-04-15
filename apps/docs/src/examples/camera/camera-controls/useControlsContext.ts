import { useThrelteUserContext } from '@threlte/core'
import { writable, type Writable } from 'svelte/store'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
  return useThrelteUserContext<ControlsContext>('threlte-controls', {
    orbitControls: writable<OrbitControls | undefined>(undefined)
  })
}

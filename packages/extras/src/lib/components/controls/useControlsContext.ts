import { useThrelteUserContext } from '@threlte/core'
import type CameraControls from 'camera-controls'
import { writable, type Writable } from 'svelte/store'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

type ControlsContext = {
  orbitControls: Writable<OrbitControls | undefined>
  trackballControls: Writable<TrackballControls | undefined>
  cameraControls: Writable<CameraControls | undefined>
}

/**
 * ### `useControlsContext`
 *
 * This hook is used to register the `OrbitControls` or `TrackballControls instance
 * with the `ControlsContext`. We're using this context to enable and disable the
 * controls when the user is interacting with the TransformControls.
 */
export const useControlsContext = (): ControlsContext => {
  return useThrelteUserContext<ControlsContext>('threlte-controls', {
    orbitControls: writable<OrbitControls | undefined>(undefined),
    trackballControls: writable<TrackballControls | undefined>(undefined),
    cameraControls: writable<CameraControls | undefined>(undefined)
  })
}

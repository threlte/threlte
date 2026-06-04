import { useThrelteUserContext } from '@threlte/core'
import type CameraControls from 'camera-controls'
import { writable, type Writable } from 'svelte/store'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import type { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

type ControlsContext = {
  orbitControls: Writable<OrbitControls | undefined>
  trackballControls: Writable<TrackballControls | undefined>
  cameraControls: Writable<CameraControls | undefined>
  transformControls: Writable<TransformControls | undefined>
}

/**
 * ### `useControlsContext`
 *
 * Internal registry of the controls instances mounted within the current
 * `<Canvas>`. Each controls component (`<OrbitControls>`,
 * `<TrackballControls>`, `<CameraControls>`, `<TransformControls>`) registers
 * itself here on mount and clears its entry on unmount.
 *
 * It powers two things:
 * - `<TransformControls>` reads the camera controls to enable/disable them
 *   while a transform gizmo is being dragged.
 * - The public `useCameraControls`, `useOrbitControls`, `useTrackballControls`
 *   and `useTransformControls` hooks expose the registered instance to user
 *   code.
 */
export const useControlsContext = (): ControlsContext => {
  return useThrelteUserContext<ControlsContext>('threlte-controls', {
    orbitControls: writable<OrbitControls | undefined>(undefined),
    trackballControls: writable<TrackballControls | undefined>(undefined),
    cameraControls: writable<CameraControls | undefined>(undefined),
    transformControls: writable<TransformControls | undefined>(undefined)
  })
}

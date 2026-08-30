import { useThrelteUserContext } from '@threlte/core'
import CameraControls from 'camera-controls'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

interface ControlsContext {
  orbitControls: {
    readonly current: OrbitControls | undefined
    set(value?: OrbitControls | undefined): void
  }
  trackballControls: {
    readonly current: TrackballControls | undefined
    set(value?: TrackballControls | undefined): void
  }
  cameraControls: {
    readonly current: CameraControls | undefined
    set(value?: CameraControls | undefined): void
  }
  transformControls: {
    readonly current: TransformControls | undefined
    set(value?: TransformControls | undefined): void
  }
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
  let orbitControls = $state.raw<OrbitControls>()
  let trackballControls = $state.raw<TrackballControls>()
  let cameraControls = $state.raw<CameraControls>()
  let transformControls = $state.raw<TransformControls>()

  return useThrelteUserContext<ControlsContext>('threlte-controls', {
    orbitControls: {
      get current() {
        return orbitControls
      },
      set(value) {
        orbitControls = value
      }
    },
    trackballControls: {
      get current() {
        return trackballControls
      },
      set(value) {
        trackballControls = value
      }
    },
    cameraControls: {
      get current() {
        return cameraControls
      },
      set(value) {
        cameraControls = value
      }
    },
    transformControls: {
      get current() {
        return transformControls
      },
      set(value) {
        transformControls = value
      }
    }
  })
}

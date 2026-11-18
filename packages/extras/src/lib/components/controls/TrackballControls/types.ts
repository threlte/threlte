import type { Props } from '@threlte/core'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

export interface TrackballControlsProps extends Props<TrackballControls> {
  /**
   * The camera to control. Falls back to the parent camera when nested inside
   * one, then to Threlte's default camera.
   */
  camera?: PerspectiveCamera | OrthographicCamera
}

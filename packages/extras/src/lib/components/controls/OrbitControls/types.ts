import type { Props } from '@threlte/core'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export interface OrbitControlsProps extends Props<OrbitControls> {
  /**
   * The camera to control. Falls back to the parent camera when nested inside
   * one, then to Threlte's default camera.
   */
  camera?: PerspectiveCamera | OrthographicCamera
}

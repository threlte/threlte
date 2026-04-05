import type { Props } from '@threlte/core'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export interface OrbitControlsProps extends Props<OrbitControls> {
  camera?: PerspectiveCamera | OrthographicCamera
}

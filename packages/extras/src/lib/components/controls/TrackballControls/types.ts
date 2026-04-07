import type { Props } from '@threlte/core'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

export interface TrackballControlsProps extends Props<TrackballControls> {
  camera?: PerspectiveCamera | OrthographicCamera
}

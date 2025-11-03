import type { Props } from '@threlte/core'
import type { CameraControls } from 'camera-controls/dist/CameraControls.js'

export interface CameraControlsProps extends Props<CameraControls> {
  ref?: CameraControls
}

import type { Props } from '@threlte/core'
import type CameraControls from 'camera-controls'

export interface CameraControlsProps extends Props<CameraControls> {
  ref?: CameraControls
}

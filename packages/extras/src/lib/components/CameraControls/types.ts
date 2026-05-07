import type { Props } from '@threlte/core'
import type CameraControls from 'camera-controls'

export interface CameraControlsProps extends Props<CameraControls> {
  ref?: CameraControls
  /**
   * Enable pointer-lock rotation. Clicking the canvas requests a pointer
   * lock; subsequent `pointermove` deltas rotate the camera directly, no
   * button hold required. `mouseButtons.left/middle/right` are forced to
   * `NONE` while this is on so built-in drag gestures don't fire; the wheel
   * continues to dolly.
   * @default false
   */
  pointerLock?: boolean
  /**
   * Radians of camera rotation per pixel of pointer movement while locked.
   * @default 0.003
   */
  pointerLockSensitivity?: number
}

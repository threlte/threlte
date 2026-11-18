import type { Props } from '@threlte/core'
import type CameraControls from 'camera-controls'
import type { OrthographicCamera, PerspectiveCamera } from 'three'

export interface CameraControlsProps extends Props<CameraControls> {
  /** The underlying `CameraControls` instance. */
  ref?: CameraControls

  /**
   * The camera to control. Falls back to the parent camera when nested inside
   * one, then to Threlte's default camera.
   */
  camera?: PerspectiveCamera | OrthographicCamera

  /**
   * Enables pointer-lock rotation. Clicking the canvas requests a pointer
   * lock, after which pointer movement rotates the camera directly, without
   * holding a button. The left, middle and right `mouseButtons` actions are
   * set to `NONE` while it's on so drag gestures don't fire, and the wheel
   * still dollies.
   * @default false
   */
  pointerLock?: boolean

  /**
   * Radians of camera rotation per pixel of pointer movement while the
   * pointer is locked.
   * @default 0.003
   */
  pointerLockSensitivity?: number
}

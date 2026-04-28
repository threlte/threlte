import type { Props } from '@threlte/core'
import type CameraControls from 'camera-controls'
import type { Camera, Object3D, OrthographicCamera, PerspectiveCamera } from 'three'

export interface CameraControlsProps extends Props<CameraControls> {
  ref?: CameraControls
  /** Camera instance to control. Uses the parent camera or Threlte's default camera when unset. */
  camera?: PerspectiveCamera | OrthographicCamera
  /** @default true */
  enabled?: boolean
  /** @default 0 */
  minPolarAngle?: number
  /** @default Math.PI */
  maxPolarAngle?: number
  /** @default -Infinity */
  minAzimuthAngle?: number
  /** @default Infinity */
  maxAzimuthAngle?: number
  /** @default Number.EPSILON */
  minDistance?: number
  /** @default Infinity */
  maxDistance?: number
  distance?: number
  /** @default false */
  infiniteDolly?: boolean
  /** @default 0.01 */
  minZoom?: number
  /** @default Infinity */
  maxZoom?: number
  /** @default 0.25 */
  smoothTime?: number
  /** @default 0.125 */
  draggingSmoothTime?: number
  /** @default Infinity */
  maxSpeed?: number
  azimuthAngle?: number
  polarAngle?: number
  /** @default 1 */
  azimuthRotateSpeed?: number
  /** @default 1 */
  polarRotateSpeed?: number
  /** @default 1 */
  dollySpeed?: number
  /** @default false */
  dollyDragInverted?: boolean
  /** @default 2 */
  truckSpeed?: number
  /** @default false */
  dollyToCursor?: boolean
  /** @default false */
  dragToOffset?: boolean
  /** @default 0 */
  boundaryFriction?: number
  /** @default false */
  boundaryEnclosesCamera?: boolean
  /** @default 0.01 */
  restThreshold?: number
  /** @default [] */
  colliderMeshes?: Object3D[]
  // @ts-expect-error - missing types
  mouseButtons?: CameraControlsMouseButtons
  // @ts-expect-error - missing types
  touches?: CameraControlsTouches
  /** @default new DOMRect(0, 0, 1, 1) */
  interactiveArea?: DOMRect | { x: number; y: number; width: number; height: number }
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

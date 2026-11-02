import type { Quaternion, Group, Vector3, Box3 } from 'three'
import type { Props } from '@threlte/core'

export interface SizeProps {
  box: Box3
  size: Vector3
  center: Vector3
  distance: number
}

export interface Origin {
  camPos: Vector3
  camRot: Quaternion
  camZoom: number
}

export interface Goal {
  camPos: Vector3 | undefined
  camRot: Quaternion | undefined
  camZoom: number | undefined
  camUp: Vector3 | undefined
  target: Vector3 | undefined
}

export interface BoundsProps extends Props<Group> {
  /**
   * Fits the camera to the children automatically, and refits whenever the
   * canvas size, camera, controls, `margin` or `animate` change. When `false`,
   * fit manually with the component's `fit` export.
   * @default true
   */
  enabled?: boolean

  /**
   * Space left around the children on every side when fitting, in world
   * units.
   * @default 1
   */
  margin?: number

  /**
   * Animates the camera to the fitted position instead of jumping to it.
   * @default true
   */
  animate?: boolean

  /** Called when a fit has finished, after any animation. */
  onFit?: () => void
}

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
   * @default 1
   */
  maxDuration?: number

  /**
   * @default 1.2
   */
  margin?: number

  /**
   * @default false
   */
  observe?: boolean

  /**
   * @default false
   */
  fit?: boolean

  /**
   * @default false
   */
  clip?: boolean

  /**
   * @default true
   */
  animate?: boolean

  interpolateFunc?: (t: number) => number

  onFit?: (data: SizeProps) => void
}

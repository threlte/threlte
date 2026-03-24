import type { Box3, Group, Vector3 } from 'three'
import type { Props } from '@threlte/core'

export type SizeProps = {
  box: Box3
  size: Vector3
  center: Vector3
  distance: number
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

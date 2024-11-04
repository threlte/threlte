import type { Key, ThrelteUseTaskOptions } from '@threlte/core'
import type { ColorRepresentation } from 'three'

type TaskOptions = Pick<ThrelteUseTaskOptions, 'after' | 'before' | 'stage'> & { key?: Key }

export type GizmoProps = {
  renderTask?: TaskOptions
  animationTask?: TaskOptions

  /**
   * @default 2 * Math.PI
   */
  turnRate?: number

  /**
   * @default [0, 0, 0]
   */
  center?: [number, number, number]

  /**
   * @default 'bottom'
   */
  verticalPlacement?: 'top' | 'bottom'

  /**
   * @default 'right'
   */
  horizontalPlacement?: 'left' | 'right'

  /**
   * @default 128
   */
  size?: number

  /**
   * @default 0xff3653
   */
  xColor?: ColorRepresentation

  /**
   * @default 0x8adb00
   */
  yColor?: ColorRepresentation

  /**
   * @default 0x2c8fff
   */
  zColor?: ColorRepresentation

  /**
   * @default false
   */
  toneMapped?: boolean

  /**
   * @default 0
   */
  paddingX?: number

  /**
   * @default 0
   */
  paddingY?: number
}

import type { Props } from '@threlte/core'
import type { ColorRepresentation, Mesh, Side, Vector3, Vector3Tuple } from 'three'

export type GridProps = Props<Mesh> & {
  /**
   * @default 'xz'
   */
  plane?: 'xz' | 'xy' | 'zy'

  /**
   * @default '#000000'
   */
  cellColor?: ColorRepresentation

  /**
   * @default 1
   */
  cellSize?: number

  /**
   * @default 1
   */
  cellThickness?: number

  /**
   * @default '#0000ee'
   */
  sectionColor?: ColorRepresentation

  /**
   * @default 10
   */
  sectionSize?: number

  /**
   * @default 2
   */
  sectionThickness?: number

  /**
   * @default '#dadada'
   */
  backgroundColor?: ColorRepresentation

  /**
   * @default 0
   */
  backgroundOpacity?: number

  /**
   * @default [20, 20]
   */
  gridSize?: number | [number, number]

  /**
   * @default false
   */
  followCamera?: boolean

  /**
   * @default false
   */
  infiniteGrid?: boolean

  /**
   * @default 100
   */
  fadeDistance?: number

  /**
   * @default 1
   */
  fadeStrength?: number

  /**
   * Set a custom fading point of origin. The current camera position will be used if unset.
   * @default undefined
   */
  fadeOrigin?: Vector3 | Vector3Tuple

  /**
   * @default Three.DoubleSide
   */
  side?: Side
  /** @default 'grid' */
  type?: 'grid' | 'lines' | 'circular' | 'polar'
  /**
   * 'line' only. Designates the world axis along which the line will be oriented.
   *  @default 'x'
   */
  axis?: 'x' | 'y' | 'z'
  /** 'circular' and 'polar' only. Maximum radius in world units. 0 removes the constraint.
   * @default 0
   */
  maxRadius?: number
  /**
   * 'polar' only. How many lines will divide the polar grid. Specifies the number of lines that will subdivide the polar grid. For instance, 2 dividers will quarter the grid into 4 sections of 90° each, while 6 dividers will divide the grid into 12 segments, each measuring 30°.
   * @default 6
   */
  cellDividers?: number
  /**
   * 'polar' only. Specifies the number of lines that will subdivide the polar grid. For instance, 2 dividers will quarter the grid into 4 sections of 90° each, while 6 dividers will divide the grid into 12 segments, each measuring 30°.
   * @default 2
   */
  sectionDividers?: number
}

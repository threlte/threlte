import type { Props } from '@threlte/core'
import type { ColorRepresentation, Mesh, Side, Vector3 } from 'three'

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
   * @default undefined, uses camera.current.position
   */
  fadeOrigin?: Vector3

  /**
   * @default Three.DoubleSide
   */
  side?: Side
} & (
    | {
        type?: 'grid'
      }
    | {
        type?: 'lines'
        axis: 'x' | 'y' | 'z'
      }
    | {
        type?: 'circular'
        maxRadius?: number
      }
    | {
        type?: 'polar'
        maxRadius?: number
        cellDividers?: number
        sectionDividers?: number
      }
  )

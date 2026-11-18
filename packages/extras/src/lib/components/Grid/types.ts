import type { Props } from '@threlte/core'
import type { ColorRepresentation, Mesh, Side, Vector3, Vector3Tuple } from 'three'

export interface GridBaseProps extends Props<Mesh> {
  /**
   * The plane the grid lies in.
   * @default 'xz'
   */
  plane?: 'xz' | 'xy' | 'zy'

  /**
   * The color of the cell lines.
   * @default '#000000'
   */
  cellColor?: ColorRepresentation

  /**
   * The size of a cell in world units.
   * @default 1
   */
  cellSize?: number

  /**
   * The thickness of the cell lines.
   * @default 1
   */
  cellThickness?: number

  /**
   * The color of the section lines.
   * @default '#0000ee'
   */
  sectionColor?: ColorRepresentation

  /**
   * The size of a section in world units. Sections are the larger divisions
   * drawn on top of the cells.
   * @default 10
   */
  sectionSize?: number

  /**
   * The thickness of the section lines.
   * @default 2
   */
  sectionThickness?: number

  /**
   * The color drawn between the lines. Only visible when
   * `backgroundOpacity` is above `0`.
   * @default '#dadada'
   */
  backgroundColor?: ColorRepresentation

  /**
   * The opacity of `backgroundColor`. `0` leaves the space between the lines
   * transparent.
   * @default 0
   */
  backgroundOpacity?: number

  /**
   * The width and height of the grid plane in world units. A number sets
   * both.
   * @default [20, 20]
   */
  gridSize?: number | [number, number]

  /**
   * Moves the grid along its plane with the camera, so it never runs out.
   * @default false
   */
  followCamera?: boolean

  /**
   * Scales the grid plane up by `fadeDistance` so it reaches the horizon.
   * Also ignores `maxRadius`.
   * @default false
   */
  infiniteGrid?: boolean

  /**
   * The distance from `fadeOrigin` at which the grid has fully faded out.
   * @default 100
   */
  fadeDistance?: number

  /**
   * How quickly the grid fades out with distance. Higher values fade sooner,
   * and `0` disables fading.
   * @default 1
   */
  fadeStrength?: number

  /**
   * The point the grid fades out from.
   * @default the camera's position
   */
  fadeOrigin?: Vector3 | Vector3Tuple

  /**
   * Which side of the grid plane is rendered.
   * @default DoubleSide
   */
  side?: Side

  /**
   * Whether the grid writes to the depth buffer. Enable to make it occlude
   * transparent objects rendered after it.
   *
   * @default false
   */
  depthWrite?: boolean
}

export type GridProps = GridBaseProps &
  (
    | {
        /**
         * The pattern drawn on the grid.
         * @default 'grid'
         */
        type?: 'grid'
      }
    | {
        /**
         * The pattern drawn on the grid. `'lines'` draws parallel lines along
         * `axis`.
         */
        type?: 'lines'
        /**
         * The world axis the lines run along.
         * @default 'x'
         */
        axis?: 'x' | 'y' | 'z'
      }
    | {
        /**
         * The pattern drawn on the grid. `'circular'` draws concentric
         * circles.
         */
        type?: 'circular'
        /**
         * The radius beyond which nothing is drawn, in world units. `0`
         * removes the limit.
         * @default 0
         */
        maxRadius?: number
      }
    | {
        /**
         * The pattern drawn on the grid. `'polar'` draws concentric circles
         * divided by lines through the center.
         */
        type?: 'polar'
        /**
         * The radius beyond which nothing is drawn, in world units. `0`
         * removes the limit.
         * @default 0
         */
        maxRadius?: number
        /**
         * The number of lines through the center that divide the cells. Each
         * line splits the circle in two, so `6` makes 12 segments of 30°.
         * @default 6
         */
        cellDividers?: number
        /**
         * The number of lines through the center that divide the sections.
         * `2` quarters the grid into 4 sections of 90°.
         * @default 2
         */
        sectionDividers?: number
      }
  )

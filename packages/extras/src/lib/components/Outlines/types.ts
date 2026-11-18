import type { Props } from '@threlte/core'
import type { ColorRepresentation, Group } from 'three'

export interface OutlinesProps extends Props<Group> {
  /**
   * The color of the outline.
   * @default 'black'
   */
  color?: ColorRepresentation

  /**
   * Keeps the outline the same thickness on screen regardless of distance
   * and zoom.
   * @default false
   */
  screenspace?: boolean

  /**
   * The opacity of the outline. Values below `1` need `transparent` set.
   * @default 1
   */
  opacity?: number

  /**
   * Whether the outline material is transparent.
   * @default false
   */
  transparent?: boolean

  /**
   * The thickness of the outline, in world units.
   * @default 0.05
   */
  thickness?: number

  /**
   * Whether the renderer's tone mapping applies to the outline.
   * @default true
   */
  toneMapped?: boolean

  /**
   * The crease angle in radians. Where faces meet at a sharper angle, the
   * outline splits instead of bulging around the corner. The default keeps
   * every corner smooth.
   * @default Math.PI
   */
  angle?: number

  /**
   * Enables polygon offset on the outline material, which helps against
   * z-fighting with the mesh.
   * @default false
   */
  polygonOffset?: boolean

  /**
   * The polygon offset factor, when `polygonOffset` is enabled.
   * @default 0
   */
  polygonOffsetFactor?: number

  /**
   * The render order of the outline mesh.
   * @default 0
   */
  renderOrder?: number
}

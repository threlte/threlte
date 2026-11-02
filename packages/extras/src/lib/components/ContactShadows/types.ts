import type { Props } from '@threlte/core'
import type { Group, ColorRepresentation } from 'three'

export interface ContactShadowsProps extends Props<Group> {
  /**
   * The opacity of the shadows.
   * @default 1
   */
  opacity?: number

  /**
   * The width of the shadow plane, multiplied by `scale`.
   * @default 1
   */
  width?: number

  /**
   * The height of the shadow plane, multiplied by `scale`.
   * @default 1
   */
  height?: number

  /**
   * How much the shadows are blurred.
   * @default 1
   */
  blur?: number

  /**
   * How far above the plane objects still cast a shadow.
   * @default 10
   */
  far?: number

  /**
   * Runs a second, weaker blur pass to reduce artifacts.
   * @default true
   */
  smooth?: boolean

  /**
   * The width and height in pixels of the render target the shadows are
   * drawn into.
   * @default 512
   */
  resolution?: number

  /**
   * How many frames the shadows are rendered for. `Infinity` re-renders them
   * every frame, and a lower number bakes them, which is cheaper for static
   * scenes. Call the component's `refresh` export to re-render baked shadows.
   * @default Infinity
   */
  frames?: number

  /**
   * Scales the shadow plane. A number scales both sides, and a tuple scales
   * the width and height separately.
   * @default 10
   */
  scale?: number | [x: number, y: number]

  /**
   * The color of the shadows.
   * @default '#000000'
   */
  color?: ColorRepresentation

  /**
   * Whether the shadow plane writes to the depth buffer.
   * @default false
   */
  depthWrite?: boolean
}

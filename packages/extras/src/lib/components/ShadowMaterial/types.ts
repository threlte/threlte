import type { Props } from '@threlte/core'
import type { MeshBasicMaterial, Side } from 'three'

export interface ShadowProps extends Props<MeshBasicMaterial> {
  /**
   * The color at the center of the shadow, which fades out to transparent at
   * the edges.
   * @default 'black'
   */
  color?: string

  /**
   * Whether the material is transparent.
   * @default true
   */
  transparent?: boolean

  /**
   * The opacity of the shadow.
   * @default 0.5
   */
  opacity?: number

  /**
   * Whether the shadow writes to the depth buffer.
   * @default false
   */
  depthWrite?: boolean

  /**
   * Which side of the faces is rendered.
   * @default DoubleSide
   */
  side?: Side

  /**
   * Whether the scene's fog affects the shadow.
   * @default false
   */
  fog?: boolean
}

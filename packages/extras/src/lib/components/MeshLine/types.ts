import type { Props } from '@threlte/core'
import type { BufferGeometry, Vector3 } from 'three'
import type { ShaderMaterial, ColorRepresentation, Texture } from 'three'

export type MeshLineGeometryProps = Props<BufferGeometry> & {
  /**
   * @default []
   */
  points: Vector3[]

  /**
   * @default 'none'
   */
  shape?: 'none' | 'taper' | 'custom'

  /**
   * @default () => 1
   */
  shapeFunction?: (p: number) => number
}

export type MeshLineMaterialProps = Omit<
  Props<ShaderMaterial>,
  'uniforms' | 'fragmentShader' | 'vertexShader'
> & {
  /** The opacity of the line. For values less than 1 transparent must be set to true.
   * @default 1
   */
  opacity?: number

  /** The color of the line.
   * @default '#ffffff'
   */
  color?: ColorRepresentation

  /** The location where the dash will begin. Ideal to animate the line.
   * @default 0
   */
  dashOffset?: number

  /** The length and space between dashes. 0 = no dash.
   * @default 0
   */
  dashArray?: number

  /** The ratio between the visible and non-visible sections of the dash.
   * @default 0
   */
  dashRatio?: number

  /** Set to false to make the line width constant regardless distance.
   * @default true
   */
  attenuate?: boolean

  /** The width of the line. If attenuate is true it's world units, otherwise it's screen pixels.
   * @default 1
   */
  width?: number

  /** The amount to scale down the line when points are close together. 0 = don't scale.
   * @default 0
   */
  scaleDown?: number
  alphaMap?: Texture | undefined
}

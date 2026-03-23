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
  /**
   * @default 1
   */
  opacity?: number

  /**
   * @default '#ffffff'
   */
  color?: ColorRepresentation

  /**
   * @default 0
   */
  dashOffset?: number

  /**
   * @default 0
   */
  dashArray?: number

  /**
   * @default 0
   */
  dashRatio?: number

  /**
   * @default true
   */
  attenuate?: boolean

  /**
   * @default 1
   */
  width?: number

  /**
   * @default 0
   */
  scaleDown?: number
  alphaMap?: Texture | undefined
}

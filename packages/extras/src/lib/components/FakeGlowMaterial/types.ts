import type { Props } from '@threlte/core'
import type { ShaderMaterial, ColorRepresentation } from 'three'

export type FakeGlowMaterialProps = Props<ShaderMaterial> & {
  /**
   * @default 0.1
   */
  falloff?: number

  /**
   * @default 6.0
   */
  glowInternalRadius?: number

  /**
   * @default 'green'
   */
  glowColor?: ColorRepresentation

  /**
   * @default 1.0
   */
  glowSharpness?: number
}

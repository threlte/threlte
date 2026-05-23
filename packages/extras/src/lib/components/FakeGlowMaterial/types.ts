import type { Props } from '@threlte/core'
import type { ShaderMaterial, ColorRepresentation } from 'three'

export type FakeGlowMaterialProps = Props<ShaderMaterial> & {
  /** Controls the value of the Falloff effect. Ranges from 0.0 to 1.0.
   * @default 0.1
   */
  falloff?: number

  /**
   * Controls the internal glow radius. Ranges from -1.0 to 1.0. Set a darker color to get the fresnel effect only.
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

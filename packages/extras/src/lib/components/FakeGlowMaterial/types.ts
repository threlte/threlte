import type { Props } from '@threlte/core'
import type { ShaderMaterial, ColorRepresentation } from 'three'

export interface FakeGlowMaterialProps extends Props<ShaderMaterial> {
  /**
   * How softly the glow fades out toward the silhouette, from `0` (hard
   * edge) to `1` (soft edge).
   * @default 0.1
   */
  falloff?: number

  /**
   * Pushes the glow out toward the silhouette. Higher values leave the center
   * of the mesh clear and concentrate the glow at its edges, for a fresnel
   * look.
   * @default 6
   */
  glowInternalRadius?: number

  /**
   * The color of the glow.
   * @default 'green'
   */
  glowColor?: ColorRepresentation

  /**
   * How opaque and intense the glow is.
   * @default 1
   */
  glowSharpness?: number
}

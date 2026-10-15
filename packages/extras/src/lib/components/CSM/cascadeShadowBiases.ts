/**
 * Scales a shadow bias across cascades.
 *
 * A cascade reaching farther spreads the same shadow map over more ground, so
 * its texels span more world space and need a larger depth offset to avoid
 * acne. Scaling by the cascade index tracks that loosely while staying small:
 * `LightShadow.bias` is a constant offset, and one large enough to match a far
 * cascade's actual texel size would push shadows off their casters entirely.
 *
 * The first cascade always receives `bias` unchanged.
 */
export const cascadeShadowBiases = (cascades: number, bias: number): number[] => {
  return Array.from({ length: cascades }, (_, index) => bias * (index + 1))
}

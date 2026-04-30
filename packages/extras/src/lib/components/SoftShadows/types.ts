export interface SoftShadowsProps {
  /** Size of the light source (the larger the softer the light)
   * @default 25
   */
  size?: number
  /** Depth focus, use it to shift the focal point (where the shadow is the sharpest)
   * @default 0
   */
  focus?: number
  /** Number of samples (more samples less noise but more expensive)
   * @default 10
   */
  samples?: number
}

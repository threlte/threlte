export type ColorStop = {
  /** The color at this stop. Any CSS color. */
  color: string
  /** The position of this stop along the gradient, from `0` to `1`. */
  offset: number
}

export type RadialGradientOuterRadius = number | 'auto'

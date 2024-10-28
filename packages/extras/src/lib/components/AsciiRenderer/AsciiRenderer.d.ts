import type { Component } from 'svelte'
import type { AsciiEffectOptions } from 'three/examples/jsm/Addons.js'

export type AsciiEffectProps = {
  /**
   * text background color. any valid css color string may be used
   */
  bgColor?: string
  /**
   * text color. any valid css color string may be used
   */
  fgColor?: string
  /**
   * characters that are used. should be ordered from least to most "opaque"
   */
  characters?: string
  /**
   * options that are used to instantiate the AsciiEffect
   */
  options?: AsciiEffectOptions
}

declare const AsciiEffect: Component<AsciiEffectProps>

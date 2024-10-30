import type { AsciiEffectOptions } from 'three/examples/jsm/Addons.js'
import type { Component } from 'svelte'
import type { Props, Task } from '@threlte/core'

export type AsciiRendererProps = Props<Task> & {
  /**
   * controls whether the render task will automatically render
   * @default true
   */
  autoRender?: boolean
  /**
   * text background color. any valid css color string may be used
   * @default '#000000',
   */
  bgColor?: string
  /**
   * text color. any valid css color string may be used
   * @default '#ffffff'
   */
  fgColor?: string
  /**
   * characters that are used. should be ordered from least to most "opaque"
   * @default ' .:-+*=%@#'
   */
  characters?: string
  /**
   * options that are used to instantiate the AsciiEffect
   * @default {}
   */
  options?: AsciiEffectOptions
}

declare const AsciiRenderer: Component<AsciiRendererProps>

import type { AsciiEffect, AsciiEffectOptions } from 'three/examples/jsm/effects/AsciiEffect.js'
import type { Camera, Scene } from 'three'
import type { Snippet } from 'svelte'

export type AsciiRendererProps = {
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

  /**
   * callback that is ran anytime the renderer is started
   */
  onstart?: () => void

  /**
   * callback that is ran anytime the renderer is stopped
   */
  onstop?: () => void

  /**
   * scene for the ascii effect to render
   * @default useThrelte().scene
   */
  scene?: Scene

  /**
   * camera to use when the ascii effect renderers
   * @default useThrelte().camera.current
   */
  camera?: Camera
  children?: Snippet<[{ asciiEffect: AsciiEffect }]>
}

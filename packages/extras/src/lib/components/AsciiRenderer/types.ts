import type { AsciiEffect, AsciiEffectOptions } from 'three/examples/jsm/effects/AsciiEffect.js'
import type { Camera, Scene } from 'three'
import type { Snippet } from 'svelte'

export interface AsciiRendererProps {
  /**
   * Starts rendering the ASCII effect on mount and disables Threlte's own
   * rendering while mounted. When `false`, call the component's `start` and
   * `stop` exports to control rendering yourself.
   * @default true
   */
  autoRender?: boolean

  /**
   * Background color of the ASCII output. Any CSS color.
   * @default '#000000'
   */
  bgColor?: string

  /**
   * Text color of the ASCII output. Any CSS color. Has no visible effect when
   * `options.color` is `true`, which colors each character individually.
   * @default '#ffffff'
   */
  fgColor?: string

  /**
   * The characters used to draw the scene, ordered from least to most opaque.
   * An empty string falls back to the default set.
   * @default ' .:-+*=%@#'
   */
  characters?: string

  /**
   * Options passed to three's `AsciiEffect`. The effect can't be updated in
   * place, so changing this recreates it.
   * @default {}
   */
  options?: AsciiEffectOptions

  /** Called whenever the ASCII render task starts. */
  onstart?: () => void

  /** Called whenever the ASCII render task stops, including on unmount. */
  onstop?: () => void

  /**
   * The scene to render.
   * @default useThrelte().scene
   */
  scene?: Scene

  /**
   * The camera to render with.
   * @default useThrelte().camera.current
   */
  camera?: Camera

  /** Rendered with the underlying `AsciiEffect` instance. */
  children?: Snippet<[{ asciiEffect: AsciiEffect }]>
}

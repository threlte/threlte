import type { Props, Stage } from '@threlte/core'
import type { Scene, ToneMapping } from 'three'

export type HUDProps = Props<Scene> & {
  /** Whether the HUD should automatically render its contents
   * @default true
   */
  autoRender?: boolean

  /** Defaults to the parent context toneMapping
   * @default AgXToneMapping
   */
  toneMapping?: ToneMapping

  /**
   * When to render the HUD. Defaults to after the render stage.
   */
  stage?: Stage
}

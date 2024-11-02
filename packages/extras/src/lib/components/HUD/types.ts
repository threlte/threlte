import type { Props, Stage } from '@threlte/core'
import type { Scene, ToneMapping } from 'three'

export type HUDProps = Props<Scene> & {
  /**
   * @default true
   */
  autoRender?: boolean

  /**
   * @default AgXToneMapping
   */
  toneMapping?: ToneMapping

  /**
   * When to render the HUD. Defaults to after the render stage.
   */
  stage?: Stage
}

import type { Props, Stage } from '@threlte/core'
import type { Scene, ToneMapping } from 'three'

export interface HUDProps extends Props<Scene> {
  /**
   * Renders the HUD scene on top of the main scene every frame. When
   * `false`, nothing is rendered until it's enabled again.
   * @default true
   */
  autoRender?: boolean

  /**
   * The tone mapping used while rendering the HUD scene.
   * @default the canvas' toneMapping
   */
  toneMapping?: ToneMapping

  /**
   * The stage the HUD is rendered in. Its task is added after the tasks
   * already in that stage, so by default it renders after the main scene.
   * @default the render stage
   */
  stage?: Stage
}

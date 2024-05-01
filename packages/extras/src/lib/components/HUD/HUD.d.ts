import type { Events, Props, Slots, Stage } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Scene, ColorSpace, ToneMapping } from 'three'

export type HUDProps = Props<Scene> & {
  /**
   * @default 'srgb'
   */
  colorSpace?: ColorSpace
  /**
   * @default ACESFilmicToneMapping
   */
  toneMapping?: ToneMapping
  /**
   * @default window.devicePixelRatio
   */
  dpr?: number
  /**
   * When to render the HUD. Defaults to after the render stage.
   */
  stage?: Stage
}

export type HUDEvents = Events<Scene>

export type HUDSlots = Slots<Scene> 

export default class HUD extends SvelteComponent<HUDProps, HUDEvents, HUDSlots> {}

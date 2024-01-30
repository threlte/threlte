import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type SpritesheetProps = Props<any> & {
  /** The URL of the spritesheet texture image. */
  textureUrl?: string

  /** The URL of the spritesheet JSON. */
  dataUrl?: string

  /**
   * The texture filtering applied to the spritesheet.
   *
   * @default 'nearest'
   */
  filter?: 'nearest' | 'linear'
}

export default class Spritesheet extends SvelteComponent<SpritesheetProps> {}

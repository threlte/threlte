import type { SpritesheetFormat } from '@threejs-kit/instanced-sprite-mesh'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Writable } from 'svelte/store'
import type { Texture } from 'three'

export type SpritesheetProps = {
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

export type SpritesheetContext = {
  textureStore: Writable<Texture | undefined>
  spritesheetStore: Writable<SpritesheetFormat | undefined>
}

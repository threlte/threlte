import type { SpritesheetFormat } from '@threejs-kit/instanced-sprite-mesh'
import { SvelteComponent } from 'svelte'
import type { Writable } from 'svelte/store'
import type { Texture } from 'three'

export type SpritesheetProps = {
  /** The URL of the spritesheet texture image. */
  textureUrl?: string

  /** The URL of the spritesheet JSON. */
  dataUrl?: string

  /** Set to true to parse aseprite json metadata */
  aseprite?: boolean

  /**
   * The texture filtering applied to the spritesheet.
   *
   * @default 'nearest'
   */
  filter?: 'nearest' | 'linear'
}

export type SpritesheetEvents = {
  /** Fires when spritesheet metadata and texture have been fully created or loaded. */
  load: void
}

export default class Spritesheet extends SvelteComponent<SpritesheetProps> {}

export type SpritesheetContext = {
  textureStore: Writable<Texture | undefined>
  spritesheetStore: Writable<SpritesheetFormat | undefined>
}

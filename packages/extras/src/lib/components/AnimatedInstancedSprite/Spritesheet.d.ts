import { SvelteComponent } from 'svelte'
import type { Events, Props, Slots } from '@threlte/core'
import type { Mesh } from 'three'

export type SpritesheetProps = Props<Mesh> & {
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

export type SpritesheetEvents = Events<Mesh>

export type SpritesheetSlots = Slots<Mesh>

export default class Spritesheet extends SvelteComponent<
  SpritesheetProps,
  SpritesheetEvents,
  SpritesheetSlots
> {}

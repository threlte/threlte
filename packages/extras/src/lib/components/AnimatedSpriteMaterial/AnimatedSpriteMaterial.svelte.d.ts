import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import { Material } from 'three'

export type Frame = {
  frame: { x: number; y: number; w: number; h: number }
  spriteSourceSize: { x: number; y: number; w: number; h: number }
  sourceSize: { w: number; h: number }
  duration?: number
}

export type FrameTag = {
  name: string
  from: number
  to: number
  direction: string
}

export type SpriteJsonHashData = {
  frames: Record<string, Frame>
  meta: {
    app: string
    image: string
    version: string
    format: string
    size: { w: number; h: number }
    scale: number
    frameTags: FrameTag[]
  }
}

export type AnimatedSpriteProps = Props<Material> & {
  /** The URL of the spritesheet texture image. */
  textureUrl: string

  /** The URL of the spritesheet JSON. */
  dataUrl?: string

  /** The current playing animation name. */
  animation?: string

  /**
   * Whether or not the current animation should loop.
   *
   * @default true
   */
  loop?: boolean

  /**
   * Controls whether or not to automatically run an animation on load.
   *
   * @default true
   */
  autoplay?: boolean

  /**
   * The desired frames per second of the animation
   *
   * This will override any frame durations specified in JSON
   */
  fps?: number

  /**
   * The texture filtering applied to the spritesheet.
   *
   * @default 'nearest'
   */
  filter?: 'nearest' | 'linear'

  /**
   * Sets the alpha value to be used when running an alpha test.
   *
   * @see https://threejs.org/docs/#api/en/materials/Material.alphaTest
   *
   * @default 0.1
   */
  alphaTest?: number

  /**
   * Delay the start of the animation in ms.
   *
   * @default 0
   */
  delay?: number

  /**
   * Whether or not the material should be transparent.
   *
   * @default true
   */
  transparent?: boolean

  /**
   * Whether or not the Sprite should flip sides on the x-axis.
   *
   * @default false
   */
  flipX?: boolean

  /**
   * The start frame of the current animation.
   *
   * @default 0
   */
  startFrame?: number

  /**
   * The end frame of the current animation.
   *
   * @default rows * columns - 1
   */
  endFrame?: number

  /**
   * The total number of frames in the spritesheet.
   */
  totalFrames?: number

  /**
   * The number of rows in the spritesheet.
   *
   * @default 1
   */
  rows?: number

  /**
   * The number of columns in the spritesheet.
   *
   * @default 1
   */
  columns?: number

  readonly play?: () => void
  readonly pause?: () => void
}

export type AnimatedSpriteEvents = Events<Material> & {
  /** Fires when all resources have loaded. */
  load: void

  /** Fires when an animation starts. */
  start: void

  /** Fires when an animation ends. */
  end: void

  /** Fires when an animation loop completes. */
  loop: void
}

export type AnimatedSpriteSlots = Slots<Material>

export default class AnimatedSprite extends SvelteComponent<
  AnimatedSpriteProps,
  AnimatedSpriteEvents,
  AnimatedSpriteSlots
> {}

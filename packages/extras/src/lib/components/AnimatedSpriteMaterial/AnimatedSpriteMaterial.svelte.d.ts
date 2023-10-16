import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import { Material } from 'three'

export type Frame = {
  frame: { x: number, y: number, w: number, h: number },
  spriteSourceSize: { x: number, y: number, w: number, h: number },
  sourceSize: { w: number, h: number },
  duration: number
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
    app: string,
    image: string,
    version: string,
    format: string,
    size: { w: number, h: number },
    scale: number
    frameTags: FrameTag[]
  }
}

export type AnimatedSpriteProps = Props<Material> & {
  /** The current playing animation */
  animation?: string

  /** The URL of the texture image */
  textureUrl: string

  /**
   * The texture filtering
   * 
   * @default 'nearest'
   */
  filter?: 'nearest' | 'linear'

  /** 
   * Whether or not the current animation should loop 
   * 
   * @default true
   */
  loop?: boolean

  /**
   * Sets the alpha value to be used when running an alpha test. 
   * 
   * @see https://threejs.org/docs/#api/en/materials/Material.alphaTest
   * 
   * @default 0.1
   */
  alphaTest?: number

  /** Control when the animation runs */
  playing?: boolean

  transparent?: boolean

// If a metadata file is supplied...
} & ({
  /** The URL of the texture JSON (if using JSON-Hash) */
  dataUrl: string

  /**
   * The desired frames per second of the animation
   * 
   * This will override any frame durations specified in JSON
   */
  fps?: number


// Otherwise...
} | {
  /**
   * The start frame of the animation
   * 
   * @default 0
   */
  startFrame?: number

  /** 
   * The end frame of the animation
   * 
   * @default rows * columns - 1
   */
  endFrame?: number

  /**
   * The desired frames per second of the animation
   * 
   * @default 10
   */
  fps?: number

  /**
   * The number of frames of the animation (required if using plain spritesheet without JSON)
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

  /** Whether or not the Sprite should flip sides on the x-axis */
  flipX?: boolean
})

export type AnimatedSpriteEvents = Events<Material> & {
  /** Fires when an animation ends */
  end: void

  /** Fires when an animation loop completes */
  loop: void
}

export type AnimatedSpriteSlots = Slots<Material>

export default class AnimatedSprite extends SvelteComponent<
  AnimatedSpriteProps,
  AnimatedSpriteEvents,
  AnimatedSpriteSlots
> {}

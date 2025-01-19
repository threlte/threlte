import type { Props } from '@threlte/core'
import type { Material } from 'three'

export type SpriteFrame = {
  x: number
  y: number
  width: number
  height: number
  name?: string
}

export type SpriteFrames = SpriteFrame[]

export type SpriteSheetData = {
  frames: SpriteFrames
  animations?: Record<string, SpriteSheetAnimation>
}

export type SpriteSheetUserData = {
  frames?: SpriteFrames
  animations?: Record<string, SpriteSheetAnimation>
}

export type SpriteSheetAnimation = {
  name: string
  from: number
  to: number
  direction: 'forward' | 'reverse'
}

export type SpriteSheetProps = Props<Material> & {
  /** The URL of the spritesheet texture image. */
  textureUrl: string

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

  /** The URL of the spritesheet JSON. */
  dataUrl?: string

  /** User created data for the spritesheet. */
  data?: SpriteSheetData

  /** The frame index or name to use from the spritesheet. Defaults to the first frame. */
  select?: number | string

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

  /** Required to start animating. */
  animate?: boolean

  /** The name of the animation to play. */
  animation?: string

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
   * Delay the start of the animation in ms.
   *
   * @default 0
   */
  delay?: number

  /** Fires when all resources have loaded. */
  onload?: () => void

  /** Fires when an animation starts. */
  onstart?: () => void

  /** Fires when an animation ends. */
  onend?: () => void

  /** Fires when an animation loop completes. */
  onloop?: () => void
}

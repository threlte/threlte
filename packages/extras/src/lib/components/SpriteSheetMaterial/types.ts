import type { Props } from '@threlte/core'
import type { Material } from 'three'
import { Direction } from './utils'

export type SpriteSheetFrame = {
  x: number
  y: number
  width: number
  height: number
  name?: string
  duration?: number
}

export type SpriteSheetAnimation = {
  name: string
  from: number
  to: number
  /** forward == 1 or reverse == -1 */
  direction?: Direction
}

export type SpriteSheetData = {
  size: {
    width: number
    height: number
  }
  frames: SpriteSheetFrame[]
  animations?: SpriteSheetAnimation[]
}

export type SpriteSheetUserData = {
  size?: {
    width: number
    height: number
  }
  frames?: SpriteSheetFrame[]
  animations?: SpriteSheetAnimation[]
}

export type SpriteSheetCreationProps = {
  /** The URL of the spritesheet JSON. */
  dataUrl?: string

  dataFormat?: 'Aseprite'

  /** User created data for the spritesheet. */
  data?: SpriteSheetData

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

  /** Required to animate. */
  animate?: boolean

  /**
   * The start frame of the current animation.
   *
   * @default 0
   */
  startFrame?: number

  /**
   * The end frame of the current animation. defaults to (`rows` * `columns`) - 1
   */
  endFrame?: number
}

export type SpriteSheetProps = Props<Material> &
  SpriteSheetCreationProps & {
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

export type Aseprite_Frame = {
  frame: { x: number; y: number; w: number; h: number }
  spriteSourceSize: { x: number; y: number; w: number; h: number }
  sourceSize: { w: number; h: number }
  duration?: number
}

export type Aseprite_FrameTag = {
  name: string
  from: number
  to: number
  direction: string
}

export type SpriteSheetData_Aseprite = {
  frames: Record<string, Aseprite_Frame>
  meta: {
    app: string
    image: string
    version: string
    format: string
    size: { w: number; h: number }
    scale: number
    frameTags: Aseprite_FrameTag[]
  }
}

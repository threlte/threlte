import type { Props } from '@threlte/core'
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

export interface AnimatedSpriteProps extends Props<Material> {
  /** The URL of the spritesheet image. */
  textureUrl: string

  /**
   * The URL of the spritesheet's JSON data, in the Aseprite "hash" format.
   * Without it, frames are laid out on a grid described by `rows`, `columns`
   * and `totalFrames`.
   * @default ''
   */
  dataUrl?: string

  /**
   * The name of the frame tag in the JSON data to play. When no tag matches,
   * every frame between `startFrame` and `endFrame` is played.
   * @default ''
   */
  animation?: string

  /**
   * Restarts the animation after its last frame. When `false`, playback stops
   * on the last frame and `onend` fires.
   * @default true
   */
  loop?: boolean

  /**
   * Starts playing as soon as the spritesheet has loaded.
   * @default true
   */
  autoplay?: boolean

  /**
   * Playback speed in frames per second, for frames that don't define their
   * own `duration` in the JSON data.
   * @default 10
   */
  fps?: number

  /**
   * The texture filter used for the spritesheet. `'nearest'` keeps pixel art
   * crisp, `'linear'` smooths it.
   * @default 'nearest'
   */
  filter?: 'nearest' | 'linear'

  /**
   * Pixels with an alpha value below this are discarded.
   * @see https://threejs.org/docs/#api/en/materials/Material.alphaTest
   * @default 0.1
   */
  alphaTest?: number

  /**
   * Time in milliseconds to wait before the first frame advances.
   * @default 0
   */
  delay?: number

  /**
   * Whether the material is rendered with transparency.
   * @default true
   */
  transparent?: boolean

  /**
   * Mirrors the sprite horizontally.
   * @default false
   */
  flipX?: boolean

  /**
   * The first frame to play. Ignored when `animation` matches a frame tag.
   * @default 0
   */
  startFrame?: number

  /**
   * The last frame to play. Ignored when `animation` matches a frame tag.
   * @default the last frame of the spritesheet
   */
  endFrame?: number

  /**
   * The number of frames on the spritesheet. Only used without `dataUrl`,
   * where it is required.
   * @default 0
   */
  totalFrames?: number

  /**
   * The number of rows on the spritesheet. Only used without `dataUrl`.
   * @default 1
   */
  rows?: number

  /**
   * The number of columns on the spritesheet. Only used without `dataUrl`.
   * @default totalFrames, a single row
   */
  columns?: number

  /** Called once the spritesheet image and data have loaded. */
  onload?: () => void

  /** Called whenever an animation is set and restarts from its first frame. */
  onstart?: () => void

  /** Called when an animation that doesn't loop reaches its last frame. */
  onend?: () => void

  /** Called each time a looping animation wraps back to its first frame. */
  onloop?: () => void
}

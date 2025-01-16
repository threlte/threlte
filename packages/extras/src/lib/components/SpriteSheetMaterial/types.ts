import type { Props } from '@threlte/core'
import { Material } from 'three'

// later is pivot/center point
export type SpriteFrame = {
  x: number
  y: number
  width: number
  height: number
}

export type SpriteFrames = Record<string, SpriteFrame>

export type SpriteSheetData = {
  frames: SpriteFrames
  // animations: { [name: string]: [frameId: number, duration: number][] }
  sheetSize: { width: number; height: number }
}

export type FrameTag = {
  name: string
  from: number
  to: number
  direction: string
}

export type SpriteJsonHashData = {
  frames: Record<string, SpriteFrame>
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

export type SpriteSheetProps = Props<Material> & {
  /** The URL of the spritesheet texture image. */
  textureUrl: string

  /** The URL of the spritesheet JSON. */
  dataUrl?: string
  /** The frame to use from the spritesheet. Defaults to the first frame.	 */
  selectedFrame?: string

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

  /** Fires when all resources have loaded. */
  onload?: () => void
}

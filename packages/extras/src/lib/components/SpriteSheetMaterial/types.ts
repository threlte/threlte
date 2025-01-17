import type { Props } from '@threlte/core'
import { Material } from 'three'

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
  /** The user created data for the spritesheet. */
  data?: SpriteSheetData

  /** The frame to use from the spritesheet. Defaults to the first frame.	 */
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

  /** Fires when all resources have loaded. */
  onload?: () => void
}

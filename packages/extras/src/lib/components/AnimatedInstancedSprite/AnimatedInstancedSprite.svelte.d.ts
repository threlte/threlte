import type {
  InstancedSpriteMesh,
  PLAY_MODE,
  SpritesheetFormat
} from '@threejs-kit/instanced-sprite-mesh'
import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Writable } from 'svelte/store'
import {
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Texture,
  type Vector2Tuple,
  type Vector3Tuple
} from 'three'

export type AnimatedInstancedSpriteProps = {
  /**
   * update animations automatically
   *
   * @default true
   */
  autoUpdate?: boolean

  /** Number of instances */
  count: number

  /** The URL of the spritesheet texture image. */
  textureUrl?: string

  /**
   * Base material used to construct the sprite material. MeshBasicMaterial by default.
   *
   */
  baseMaterial?:
    | typeof MeshBasicMaterial
    | typeof MeshStandardMaterial
    | typeof MeshLambertMaterial
    | typeof MeshPhongMaterial

  /**
   * sets the default global billboarding state that is used unless the setAt was called on the instance
   *
   * @default true
   */
  billboarding?: boolean

  /**
   * changes playmode for all instances
   * `"FORWARD" | "REVERSE" | "PAUSE" | "PINGPONG"`
   *
   * @default true
   */
  playmode?: keyof typeof PLAY_MODE

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

  transparent?: boolean

  randomPlaybackOffset?: boolean | number

  /**
   * Whether or not the material should be transparent.
   *
   * @default true
   */
  // transparent?: boolean

  /**
   * Whether or not the Sprite should flip sides on the x-axis.
   *
   * @default false
   */
  // flipX?: boolean

  /**
   * The start frame of the current animation.
   *
   * @default 0
   */
  // startFrame?: number

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

  texture?: Texture | undefined
  spritesheet?: SpritesheetFormat | undefined

  ref?: any
}

export type AnimatedInstancedSpriteEvents = any

export type AnimatedInstancedSpriteSlots = any

export type AnimatedInstancedSpriteInternalCtx = {
  setSpritesheet: (spritesheet: SpritesheetFormat) => void
  setTexture: (texture: Texture) => void
}

export type AnimatedInstancedSpriteUserCtx = {
  mesh: InstancedSpriteMesh<any, any>
  count: number
  animationMap: Writable<Map<string, number>>
  updatePosition: (id: number, position: Vector3Tuple, scale?: Vector2Tuple) => void
}

export default class AnimatedInstancedSprite extends SvelteComponent<
  AnimatedInstancedSpriteProps,
  AnimatedInstancedSpriteEvents,
  AnimatedInstancedSpriteSlots
> {}

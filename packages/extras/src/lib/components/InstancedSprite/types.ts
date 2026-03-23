import type {
  InstancedSpriteMesh,
  PLAY_MODE,
  SpritesheetFormat
} from '@threejs-kit/instanced-sprite-mesh'
import type { Props } from '@threlte/core'
import type { Writable } from 'svelte/store'
import {
  InstancedMesh,
  Material,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Texture,
  type Vector2Tuple,
  type Vector3Tuple
} from 'three'
import type SpriteInstance from './SpriteInstance.svelte'
import type { Snippet } from 'svelte'

export type InstancedSpriteProps = Omit<
  Props<InstancedMesh, [{ Instance: typeof SpriteInstance }]>,
  'ref'
> & {
  ref?: InstancedSpriteMesh<
    MeshBasicMaterial | MeshStandardMaterial | MeshLambertMaterial | MeshPhongMaterial,
    unknown
  >

  children?: Snippet<[{ Instance: typeof SpriteInstance }]>

  /**
   * update animations automatically
   *
   * @default true
   */
  autoUpdate?: boolean

  /**
   * Number of instances
   * @default 1000
   */
  count: number

  /**
   * Base material used to construct the sprite material.
   * @default MeshBasicMaterial
   */
  baseMaterial?:
    | typeof MeshBasicMaterial
    | typeof MeshStandardMaterial
    | typeof MeshLambertMaterial
    | typeof MeshPhongMaterial
  // todo better typing of this in upstream library

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
   * @default "FORWARD"
   */
  playmode?: keyof typeof PLAY_MODE

  /**
   * The desired frames per second of the animation
   *
   * This will override any frame durations specified in JSON
   * @default 15
   */
  fps?: number

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
   * Hue shift
   *
   */
  hueShift?:
    | {
        h: number
        s: number
        v: number
      }
    | undefined

  /**
   * @default false
   */
  randomPlaybackOffset?: boolean | number
  spritesheet: {
    spritesheet: SpritesheetFormat
    texture: Texture
  }
}

export type InstancedSpriteUserCtx<T> = {
  sprite: InstancedSpriteMesh<Material, T>
  count: number
  animationMap: Writable<Map<string, number>>
  updatePosition: (id: number, position: Vector3Tuple, scale?: Vector2Tuple) => void
}

export type SpriteInstanceProps = {
  /**
   * @default 0
   */
  id: number

  animationName?: string

  /**
   * @default [0, 0, 0]
   */
  position?: Vector3Tuple

  /**
   * @default [1, 1]
   */
  scale?: Vector2Tuple
  playmode?: keyof typeof PLAY_MODE
  billboarding?: boolean
  offset?: number
  loop?: boolean
  flipX?: boolean
  flipY?: boolean
  frameId?: number
}

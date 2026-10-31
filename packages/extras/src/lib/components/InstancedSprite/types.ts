import type {
  InstancedSpriteMesh,
  PLAY_MODE,
  SpritesheetFormat
} from '@threejs-kit/instanced-sprite-mesh'
import type { OmitProps, Props } from '@threlte/core'
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

type SpriteMesh = InstancedSpriteMesh<
  MeshBasicMaterial | MeshStandardMaterial | MeshLambertMaterial | MeshPhongMaterial,
  unknown
>

export interface InstancedSpriteProps
  extends
    OmitProps<
      Props<InstancedMesh, [{ Instance: typeof SpriteInstance }]>,
      keyof InstancedSpriteOptions | 'ref' | 'material'
    >,
    InstancedSpriteOptions {
  /** The underlying `InstancedSpriteMesh`. */
  ref?: SpriteMesh

  /** Receives the `Instance` component used to place each sprite. */
  children?: Snippet<[{ Instance: typeof SpriteInstance }]>
}

export interface InstancedSpriteOptions {
  /**
   * Advances the animations every frame. When `false`, call `update()` on
   * the `ref` mesh yourself.
   * @default true
   */
  autoUpdate?: boolean

  /**
   * The number of sprite instances. Read once on mount.
   * @default 1000
   */
  count?: number

  /**
   * The material class the sprite material is built from. Read once on
   * mount.
   * @default MeshBasicMaterial
   */
  baseMaterial?:
    | typeof MeshBasicMaterial
    | typeof MeshStandardMaterial
    | typeof MeshLambertMaterial
    | typeof MeshPhongMaterial
  // todo better typing of this in upstream library

  /**
   * Makes every instance face the camera, unless an `<Instance>` sets its
   * own `billboarding`.
   * @default false
   */
  billboarding?: boolean

  /**
   * How every instance plays its animation, unless an `<Instance>` sets its
   * own `playmode`.
   * @default 'FORWARD'
   */
  playmode?: keyof typeof PLAY_MODE

  /**
   * Playback speed of the animations in frames per second.
   * @default 15
   */
  fps?: number

  /**
   * Pixels with an alpha value below this are discarded.
   * @see https://threejs.org/docs/#api/en/materials/Material.alphaTest
   * @default 0.1
   */
  alphaTest?: number

  /**
   * Whether the sprite material is rendered with transparency.
   * @default true
   */
  transparent?: boolean

  /**
   * Shifts the hue, saturation and value of every sprite.
   */
  hueShift?:
    | {
        h: number
        s: number
        v: number
      }
    | undefined

  /**
   * Starts each instance at a random point in its animation so they don't
   * play in sync. A number sets the range of the random offset, and `true`
   * uses `100`.
   * @default false
   */
  randomPlaybackOffset?: boolean | number

  /**
   * The spritesheet's frame data and texture, as built with
   * `buildSpritesheet`.
   */
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

export interface SpriteInstanceProps {
  /**
   * The index of the sprite instance to control, from `0` to `count - 1`.
   * @default 0
   */
  id: number

  /** The name of the animation this instance plays. */
  animationName?: string

  /**
   * The position of this instance.
   * @default [0, 0, 0]
   */
  position?: Vector3Tuple

  /**
   * The width and height of this instance.
   * @default [1, 1]
   */
  scale?: Vector2Tuple

  /** How this instance plays its animation, overriding the sprite's `playmode`. */
  playmode?: keyof typeof PLAY_MODE

  /** Makes this instance face the camera, overriding the sprite's `billboarding`. */
  billboarding?: boolean

  /** Offsets this instance's animation time. */
  offset?: number

  /** Whether this instance's animation loops. */
  loop?: boolean

  /** Mirrors this instance horizontally. */
  flipX?: boolean

  /** Mirrors this instance vertically. */
  flipY?: boolean

  /**
   * Shows this frame of the animation instead of playing it.
   */
  frameId?: number
}

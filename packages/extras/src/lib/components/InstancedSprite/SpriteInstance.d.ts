import type { PLAY_MODE } from '@threejs-kit/instanced-sprite-mesh'
import { SvelteComponent } from 'svelte'
import type { Vector2Tuple, Vector3Tuple } from 'three'

export type SpriteInstanceProps = {
  id: number
  animationName?: string
  position?: Vector3Tuple
  scale?: Vector2Tuple
  playmode?: keyof typeof PLAY_MODE
  billboarding?: boolean
  offset?: number
  loop?: boolean
  flipX?: boolean
  flipY?: boolean
  frameId?: number
}

export default class SpriteInstance extends SvelteComponent<SpriteInstanceProps> {}

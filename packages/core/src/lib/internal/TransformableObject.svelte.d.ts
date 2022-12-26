import type { SvelteComponentTyped } from 'svelte'
import type { Object3D } from 'three'
import type { LookAt, Position, Rotation, Scale } from '../types/types'

export type TransformableObjectProps = {
  object: Object3D
  position?: Position
  scale?: Scale
  rotation?: Rotation
  lookAt?: LookAt
}

export default class TransformableObject extends SvelteComponentTyped<TransformableObjectProps> {}

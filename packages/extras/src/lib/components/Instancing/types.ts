import type { Props } from '@threlte/core'
import type { PositionMesh } from './PositionMesh.js'
import type { ColorRepresentation } from 'three'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export type InstanceProps = Props<PositionMesh> & {
  id?: string
  color?: ColorRepresentation
}

export type InstancedMeshProps = Props<ThreeInstancedMesh> & {
  /**
   * @default 'default'
   */
  id?: string

  /** Limits the amount of possible <Instance> components.
   * @default 1000
   */
  limit?: number

  /** Limits the amount of drawn <Instance> components.
   * @default 1000
   */
  range?: number

  /** Whether the THREE.InstancedMesh should be updated.
   * @default true
   */
  update?: boolean
}

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

  /**
   * @default 1000
   */
  limit?: number

  /**
   * @default 1000
   */
  range?: number

  /**
   * @default true
   */
  update?: boolean
}

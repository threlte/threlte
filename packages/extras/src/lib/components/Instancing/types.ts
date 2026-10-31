import type { OmitProps, Props } from '@threlte/core'
import type { PositionMesh } from './PositionMesh.js'
import type { ColorRepresentation } from 'three'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export interface InstanceProps extends OmitProps<
  Props<PositionMesh>,
  'instancedMesh' | 'instances' | 'geometry'
> {
  /**
   * The `id` of the `<InstancedMesh>` this instance belongs to.
   * @default the id provided by <InstancedMeshes>, otherwise 'default'
   */
  id?: string

  /**
   * The color of this instance.
   * @default 'white'
   */
  color?: ColorRepresentation
}

export interface InstancedMeshProps extends Props<ThreeInstancedMesh> {
  /**
   * Identifies this mesh, so nested `<Instance>` components can pick which
   * `<InstancedMesh>` they belong to when several are nested.
   * @default 'default'
   */
  id?: string

  /**
   * The maximum number of instances. Read once on mount.
   * @default 1000
   */
  limit?: number

  /**
   * The number of instances drawn, up to `limit`.
   * @default 1000
   */
  range?: number

  /**
   * Updates the instances' matrices and colors every frame. Set it to `false`
   * for static instances, which are then only updated once.
   * @default true
   */
  update?: boolean
}

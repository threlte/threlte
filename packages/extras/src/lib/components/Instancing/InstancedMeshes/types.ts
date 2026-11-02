import type { Props } from '@threlte/core'
import type { InstancedMesh, Mesh } from 'three'
import type Instance from '../Instance.svelte'
import type { InstancedMeshProps } from '../types.js'

export type Meshes = Mesh[] | Record<string, Mesh>

export type InstancedMeshesProps<T extends Meshes> = Props<
  InstancedMesh,
  [{ components: T extends Mesh[] ? (typeof Instance)[] : { [key in keyof T]: typeof Instance } }]
> &
  Pick<InstancedMeshProps, 'limit' | 'range' | 'update'> & {
    /**
     * The meshes to instance, as an array or an object of meshes by name.
     * Each one becomes an `<InstancedMesh>` with its geometry and material,
     * and the children snippet receives a matching `<Instance>` component
     * for each, in the same shape.
     */
    meshes: T
  }

import type { Props } from '@threlte/core'
import type { InstancedMesh, Mesh } from 'three'
import type Instance from '../Instance.svelte'

export type Meshes = Mesh[] | Record<string, Mesh>

export type InstancedMeshesProps<T extends Meshes> = Props<
  InstancedMesh,
  [{ components: T extends Mesh[] ? (typeof Instance)[] : { [key in keyof T]: typeof Instance } }]
> & {
  meshes: T
}

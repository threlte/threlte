import type { Events, Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { InstancedMesh, Mesh } from 'three'
import type Instance from '../Instance.svelte'

export type Meshes = Mesh[] | Record<string, Mesh>

export type InstancedMeshesProps<T extends Meshes> = Props<InstancedMesh> & {
  meshes: T
}
export type InstancedMeshesEvents = Events<InstancedMesh>
export type InstancedMeshesSlots<T extends Meshes> = {
  default: {
    components: T extends Mesh[] ? (typeof Instance)[] : { [key in keyof T]: typeof Instance }
  }
}

export default class InstancedMeshes<T extends Meshes> extends SvelteComponent<
  InstancedMeshesProps<T>,
  InstancedMeshesEvents,
  InstancedMeshesSlots<T>
> {}

import type { Props } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { InstancedMesh, Mesh } from 'three'
import type Instance from '../Instance.svelte'

export type Meshes = Mesh[] | Record<string, Mesh>

export interface InstancedMeshesProps<T extends Meshes>
  extends Omit<Props<InstancedMesh>, 'children'> {
  meshes: T
  children?: InstancedMeshesSnippet<T>
}

export type InstancedMeshesSnippet<T> = Snippet<
  [{ components: T extends Mesh[] ? (typeof Instance)[] : { [key in keyof T]: typeof Instance } }]
>

export default class InstancedMeshes<T extends Meshes> extends SvelteComponent<
  InstancedMeshesProps<T>
> {}

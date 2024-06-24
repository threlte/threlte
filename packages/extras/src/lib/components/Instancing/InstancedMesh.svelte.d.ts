import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export type InstancedMeshProps = Props<ThreeInstancedMesh> & {
  id?: string
  limit?: number
  range?: number
  update?: boolean
}

export default class InstancedMesh extends SvelteComponent<InstancedMeshProps> {}

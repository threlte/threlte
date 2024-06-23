import type { Events, Props } from '@threlte/core'
import type { Snippet, SvelteComponent } from 'svelte'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export type InstancedMeshProps = Props<ThreeInstancedMesh> & {
  id?: string
  limit?: number
  range?: number
  update?: boolean
  children?: InstancedMeshSnippet
}

export type InstancedMeshEvents = Events<ThreeInstancedMesh>
export type InstancedMeshSnippet = Snippet<[{ ref: ThreeInstancedMesh }]>

export default class InstancedMesh extends SvelteComponent<
  InstancedMeshProps,
  InstancedMeshEvents
> {}

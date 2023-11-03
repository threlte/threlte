import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export type InstancedMeshProps = Props<ThreeInstancedMesh> & {
  id?: string
  limit?: number
  range?: number
  update?: boolean
}

export type InstancedMeshEvents = Events<ThreeInstancedMesh>
export type InstancedMeshSlots = Slots<ThreeInstancedMesh>

export default class InstancedMesh extends SvelteComponent<
  InstancedMeshProps,
  InstancedMeshEvents,
  InstancedMeshSlots
> {}

import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export type InstancedMeshProps = Omit<
  Props<ThreeInstancedMesh>,
  'instanceMatrix' | 'instanceColor'
> & {
  id?: string
  limit?: number
  range?: number
  update?: boolean
}

export type InstancedMeshEvents = Events<ThreeInstancedMesh>
export type InstancedMeshSlots = Slots<ThreeInstancedMesh>

export default class InstancedMesh extends SvelteComponentTyped<
  InstancedMeshProps,
  InstancedMeshEvents,
  InstancedMeshSlots
> {}

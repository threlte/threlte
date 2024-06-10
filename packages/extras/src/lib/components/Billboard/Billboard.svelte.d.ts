import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Group, Object3D } from 'three'

export type BillboardProps = Props<Group> & {
  follow?: boolean | Object3D
}

export type BillboardEvents = Events<Group>
export type BillboardSlots = Slots<Group>

export default class Billboard extends SvelteComponent<
  BillboardProps,
  BillboardEvents,
  BillboardSlots
> {}

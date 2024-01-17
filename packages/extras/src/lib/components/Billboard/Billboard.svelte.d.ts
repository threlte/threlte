import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group } from 'three'

export type BillboardProps = Props<Group> & {
  follow?: boolean
  lockX?: boolean
  lockY?: boolean
  lockZ?: boolean
}

export type BillboardEvents = Events<Group>
export type BillboardSlots = Slots<Group>

export default class Billboard extends SvelteComponentTyped<
  BillboardProps,
  BillboardEvents,
  BillboardSlots
> {}

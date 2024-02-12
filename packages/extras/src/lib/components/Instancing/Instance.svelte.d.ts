import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { PositionMesh } from './PositionMesh'
import type { Color } from 'three'

export type InstanceProps = Props<PositionMesh> & {
  id?: string
  color?: Parameters<Color['set']>[0]
}

export type InstanceEvents = Events<PositionMesh>
export type InstanceSlots = Slots<PositionMesh>

export default class Instance extends SvelteComponent<
  InstanceProps,
  InstanceEvents,
  InstanceSlots
> {}

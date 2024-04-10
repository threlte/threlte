import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ExtrudeGeometry, Group } from 'three'

export type RoundedBoxGeometryProps = Props<ExtrudeGeometry> & {
  args?: [width?: number, height?: number, depth?: number] | []
  radius?: number
  smoothness?: number
  creaseAngle?: number
  steps?: number
  ref?: ExtrudeGeometry
}

export type RoundedBoxGeometryEvents = Events<Group>

export type RoundedBoxGeometrySlots = Slots<Group>

export default class RoundedBoxGeometry extends SvelteComponent<
  RoundedBoxGeometryProps,
  RoundedBoxGeometryEvents,
  RoundedBoxGeometrySlots
> {}

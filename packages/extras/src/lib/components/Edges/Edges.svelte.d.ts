import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ColorRepresentation, LineSegments } from 'three'

export type EdgesProps = Props<LineSegments> & {
  thresholdAngle?: number
  color?: ColorRepresentation
}

export type EdgesEvents = Events<LineSegments>

export type EdgesSlots = Slots<LineSegments>

export default class Edges extends SvelteComponent<EdgesProps, EdgesEvents, EdgesSlots> {}

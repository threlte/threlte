import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { ColorRepresentation, LineSegments } from 'three'

export type EdgesProps = Props<LineSegments> & {
  thresholdAngle?: number
  color?: ColorRepresentation
}

export default class Edges extends SvelteComponent<EdgesProps> {}

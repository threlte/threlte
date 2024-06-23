import type { Events, Props } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { ColorRepresentation, LineSegments } from 'three'

export type EdgesProps = Props<LineSegments> & {
  thresholdAngle?: number
  color?: ColorRepresentation
  children?: EdgesSnippet
}

export type EdgesEvents = Events<LineSegments>

export type EdgesSnippet = Snippet<[{ ref: LineSegments }]>

export default class Edges extends SvelteComponent<EdgesProps, EdgesEvents> {}

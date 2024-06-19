import type { Events, Props } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { Group } from 'three'

export type FloatProps = Props<Group> & {
  speed?: number | [x: number, y: number, z: number]
  floatIntensity?: number | [x: number, y: number, z: number]
  floatingRange?: [number, number] | [x: [number, number], y: [number, number], z: [number, number]]
  rotationIntensity?: number | [x: number, y: number, z: number]
  rotationSpeed?: number | [x: number, y: number, z: number]
  seed?: number
  children: FloatSnippet
}

export type FloatEvents = Events<Group>
export type FloatSnippet = Snippet<[{ ref: Group }]>

export default class Float extends SvelteComponent<FloatProps, FloatEvents> {}

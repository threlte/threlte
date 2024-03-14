import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Group } from 'three'

export type FloatProps = Props<Group> & {
  speed?: number | [x: number, y: number, z: number]
  floatIntensity?: number | [x: number, y: number, z: number]
  floatingRange?: [number, number] | [x: [number, number], y: [number, number], z: [number, number]]
  rotationIntensity?: number | [x: number, y: number, z: number]
  rotationSpeed?: number | [x: number, y: number, z: number]
  seed?: number
}

export type FloatEvents = Events<Group>
export type FloatSlots = Slots<Group>

export default class Float extends SvelteComponent<FloatProps, FloatEvents, FloatSlots> {}

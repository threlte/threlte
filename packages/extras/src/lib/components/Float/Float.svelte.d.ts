import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group } from 'three'

export type FloatProps = Props<Group> & {
  speed: number | [x: number, y: number, z: number]
  floatIntensity: number | [x: number, y: number, z: number]
  floatingRange: [number, number] | [x: [number, number], y: [number, number], z: [number, number]]
  rotationIntensity: number | [x: number, y: number, z: number]
  rotationSpeed: number | [x: number, y: number, z: number]
}

export default class Float extends SvelteComponentTyped<FloatProps, Events<Group>, Slots<Group>> {}

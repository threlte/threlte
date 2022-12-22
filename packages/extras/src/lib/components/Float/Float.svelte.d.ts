import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group } from 'three'

export type FloatProps = Props<Group> & {
  speed: number
  rotationIntensity: number
  floatIntensity: number
  floatingRange: [number, number]
}

export default class Float extends SvelteComponentTyped<FloatProps, Events<Group>, Slots<Group>> {}

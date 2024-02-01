import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Points } from 'three'

export type StarsProps = Props<Points> & {
  radius?: number
  depth?: number
  count?: number
  factor?: number
  saturation?: number
  fade?: boolean
  speed?: number
  lightness?: number
}

export type StarsEvents = Events<Points>
export type StarsSlots = Slots<Points>

export default class Stars extends SvelteComponent<StarsSlots, StarsEvents, StarsSlots> {}

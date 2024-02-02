import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Points } from 'three'

export type StarsProps = Props<Points> & {
  radius?: number
  depth?: number
  count?: number
  factor?: number
  saturation?: number
  lightness?: number
  fade?: boolean
  speed?: number
  opacity?: number
}

export type StarsEvents = Events<Points>
export type StarsSlots = Slots<Points>

export default class Stars extends SvelteComponent<StarsProps, StarsEvents, StarsSlots> {}

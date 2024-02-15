import type { Splat } from '@pmndrs/vanilla'
import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type SplatProps = Props<Splat> & {
  alphaHash?: boolean
  alphaTest?: number | undefined
  toneMapped?: boolean
}

export type SplatEvents = Events<Splat>

export type SplatSlots = Slots<Splat>

export default class Splat extends SvelteComponent<SplatProps, SplatEvents, SplatSlots> {}

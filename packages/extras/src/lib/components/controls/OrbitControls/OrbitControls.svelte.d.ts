import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export type OrbitControlsProps = Props<ThreeOrbitControls>
export type OrbitControlsEvents = Events<ThreeOrbitControls>
export type OrbitControlsSlots = Slots<ThreeOrbitControls>

export default class OrbitControls extends SvelteComponentTyped<
  OrbitControlsProps,
  OrbitControlsEvents,
  OrbitControlsSlots
> {}

import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type OrbitControlsProps = Props<ThreeOrbitControls>
export type OrbitControlsEvents = Events<ThreeOrbitControls>
export type OrbitControlsSlots = Slots<ThreeOrbitControls>

export default class OrbitControls extends SvelteComponent<
  OrbitControlsProps,
  OrbitControlsEvents,
  OrbitControlsSlots
> {}

import type { Events, Props } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type OrbitControlsProps = Props<ThreeOrbitControls> & {
  children?: OrbitControlsSnippet
}
export type OrbitControlsEvents = Events<ThreeOrbitControls>
export type OrbitControlsSnippet = Snippet<[{ ref: ThreeOrbitControls }]>

export default class OrbitControls extends SvelteComponent<
  OrbitControlsProps,
  OrbitControlsEvents
> {}

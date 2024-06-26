import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type OrbitControlsProps = Props<ThreeOrbitControls>

export default class OrbitControls extends SvelteComponent<OrbitControlsProps> {}

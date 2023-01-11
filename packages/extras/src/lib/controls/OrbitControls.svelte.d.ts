import type { Props } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export type OrbitControlsProps = Props<ThreeOrbitControls>

export default class OrbitControls extends SvelteComponentTyped<OrbitControlsProps> {}

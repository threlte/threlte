import type { LOD } from 'three'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type DetailedProps = Props<LOD>

export default class Detailed extends SvelteComponent<DetailedProps> {}

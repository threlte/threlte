import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Object3D } from 'three'

export type HelperProps<Type extends Object3D = Object3D> = Props<Type & { update?: () => void }>

export default class Grid extends SvelteComponent<HelperProps> {}

import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Group, Object3D } from 'three'

export type BillboardProps = Props<Group> & {
  follow?: boolean | Object3D
}

export default class Billboard extends SvelteComponent<BillboardProps> {}

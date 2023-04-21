import type { Events, Props } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { InstancedMesh, Mesh } from 'three'
import type Instance from '../Instance.svelte'

export type Meshes = Mesh[] | Record<string, Mesh>

export type MergedProps<T extends Meshes> = Props<InstancedMesh> & {
  meshes: T
}
export type MergedEvents = Events<InstancedMesh>
export type MergedSlots<T extends Meshes> = {
  default: {
    components: T extends Mesh[] ? typeof Instance[] : { [key in keyof T]: typeof Instance }
  }
}

export default class Merged<T extends Meshes> extends SvelteComponentTyped<
  MergedProps<T>,
  MergedEvents,
  MergedSlots<T>
> {}

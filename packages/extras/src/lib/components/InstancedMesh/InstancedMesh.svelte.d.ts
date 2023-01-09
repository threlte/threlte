import type { Props } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export type InstancedMeshProps = Props<ThreeInstancedMesh> & {
  id?: string

  viewportAware?: boolean
  inViewport?: boolean
}

export default class InstancedMesh extends SvelteComponentTyped<InstancedMeshProps> {}

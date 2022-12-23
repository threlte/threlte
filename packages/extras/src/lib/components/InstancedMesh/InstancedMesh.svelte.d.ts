import type { InteractiveObjectProperties, Object3DInstanceProperties } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { BufferGeometry, Material } from 'three'

export type InstancedMeshProps = Omit<
  Omit<Object3DInstanceProperties, 'object'> & Omit<InteractiveObjectProperties, 'object'>,
  'frustumCulled'
> & {
  geometry: BufferGeometry
  material: Material | Material[]
  count?: number
  id?: string
}

// export type InstancedMeshProps = Omit<
//   Object3DInstanceProperties & InteractiveObjectProperties,
//   'object' | 'frustumCulled'
// > & {
//   geometry: BufferGeometry
//   material: Material | Material[]
//   count?: number
//   id?: string
// }

export default class InstancedMesh extends SvelteComponentTyped<InstancedMeshProps> {}

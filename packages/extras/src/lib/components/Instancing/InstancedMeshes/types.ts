import type { Props } from '@threlte/core'
import type { InstancedMesh, Mesh } from 'three'
import type Instance from '../Instance.svelte'

export type Meshes = Mesh[] | Record<string, Mesh>

export type InstancedMeshesProps<T extends Meshes> = Props<
  InstancedMesh,
  [{ components: T extends Mesh[] ? (typeof Instance)[] : { [key in keyof T]: typeof Instance } }]
> & {
  meshes: Mesh[] | Record<string, Mesh>
  /** Limits the amount of possible <Instance> components.
   * @default 1000
   */
  limit?: number

  /** Limits the amount of drawn <Instance> components.
   * @default 1000
   */
  range?: number

  /** Whether the THREE.InstancedMesh should be updated.
   * @default true
   */
  update?: boolean
}

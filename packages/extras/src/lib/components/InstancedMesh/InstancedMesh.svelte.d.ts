import { SvelteComponentTyped } from 'svelte'
import type { BufferGeometry, Euler, Material, Vector3 } from 'three'

export type InstancedMeshProps = {
  position?: Parameters<Vector3['set']>
  rotation?: Parameters<Euler['set']>
  scale?: Parameters<Vector3['set']>
  viewportAware?: boolean
  inViewport?: boolean
  castShadow?: boolean
  receiveShadow?: boolean
  renderOrder?: number
  visible?: boolean
  userData?: Record<string, any>
  dispose?: boolean
  interactive?: boolean
  ignorePointer: boolean
  lookAt?: Parameters<Vector3['set']>

  geometry: BufferGeometry
  material: Material | Material[]
  count?: number
  id?: string
}

export default class InstancedMesh extends SvelteComponentTyped<InstancedMeshProps> {}

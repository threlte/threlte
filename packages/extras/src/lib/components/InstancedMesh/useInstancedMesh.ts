import type { ThrelteInstance } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'

type InstancedMeshContext = {
  registerInstance: (instance: ThrelteInstance) => void
  removeInstance: (instance: ThrelteInstance) => void
  setInstanceMatrix: (instance: ThrelteInstance) => void
  setInstanceColor: (instance: ThrelteInstance) => void
  parentObject: Object3D
}

const instancedMeshContextName = 'threlte-instanced-mesh-context' as const

export function useInstancedMesh(id: string | undefined): InstancedMeshContext {
  return getContext<InstancedMeshContext>(instancedMeshContextName + id)
}

export function setInstancedMesh(id: string | undefined, context: InstancedMeshContext): void {
  setContext<InstancedMeshContext>(instancedMeshContextName + id, context)
}

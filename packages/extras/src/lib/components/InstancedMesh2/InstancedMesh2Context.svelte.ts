import type { InstancedMesh2 } from '@three.ez/instanced-mesh'
import { getContext, setContext } from 'svelte'

export class InstancedMesh2Context {
  ref: InstancedMesh2 | undefined = $state()
  // bvh,options etc
}

const key = Symbol('threlte-extras-instanced-mesh-2-ctx')

export const createInstancedMesh2Context = () => {
  const ctx = new InstancedMesh2Context()
  setContext(key, ctx)
  return ctx
}

export const useInstancedMesh2 = (): InstancedMesh2Context => {
  return getContext(key)
}

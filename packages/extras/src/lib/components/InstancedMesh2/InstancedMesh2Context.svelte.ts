import type { InstancedMesh2 } from '@three.ez/instanced-mesh'
import { getContext, setContext } from 'svelte'
import { Matrix4, Vector3 } from 'three'

export class InstancedMesh2Context {
  ref: InstancedMesh2 | undefined = $state()
  tempM4: Matrix4
  tempV3: Vector3

  constructor() {
    this.tempM4 = new Matrix4()
    this.tempV3 = new Vector3()
  }
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

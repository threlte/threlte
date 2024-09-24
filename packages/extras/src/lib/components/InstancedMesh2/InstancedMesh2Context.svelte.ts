import type { InstancedMesh2 } from '@three.ez/instanced-mesh'
import { getContext, setContext } from 'svelte'
import { Matrix4, Quaternion, Vector3 } from 'three'

export class InstancedMesh2Context {
  ref: InstancedMesh2 | undefined = $state()
  tempM4: Matrix4
  tempPositionV3: Vector3
  tempScaleV3: Vector3
  tempQuat: Quaternion
  onclick = $state(new Map<number, typeof Function>())

  constructor() {
    this.tempM4 = new Matrix4()
    this.tempPositionV3 = new Vector3()
    this.tempScaleV3 = new Vector3()
    this.tempQuat = new Quaternion()
  }

  registerEvent(instanceId: number, event: 'onclick', fun: typeof Function) {
    this.onclick.set(instanceId, fun)
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

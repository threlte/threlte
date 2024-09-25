import type { InstancedMesh2 } from '@three.ez/instanced-mesh'
import { getContext, setContext } from 'svelte'
import { Matrix4, Quaternion, Vector3 } from 'three'
import type { interactivityEventNames } from '../../interactivity/plugin'

export class InstancedMesh2Context {
  ref: InstancedMesh2 | undefined = $state()
  tempM4: Matrix4
  tempPositionV3: Vector3
  tempScaleV3: Vector3
  tempQuat: Quaternion

  onclick = $state(new Map<number, typeof Function>())
  oncontextmenu = $state(new Map<number, typeof Function>())
  ondblclick = $state(new Map<number, typeof Function>())
  onwheel = $state(new Map<number, typeof Function>())
  onpointerup = $state(new Map<number, typeof Function>())
  onpointerdown = $state(new Map<number, typeof Function>())
  onpointerover = $state(new Map<number, typeof Function>())
  onpointerout = $state(new Map<number, typeof Function>())
  onpointerenter = $state(new Map<number, typeof Function>())
  onpointerleave = $state(new Map<number, typeof Function>())
  onpointermove = $state(new Map<number, typeof Function>())
  onpointermissed = $state(new Map<number, typeof Function>())

  constructor() {
    this.tempM4 = new Matrix4()
    this.tempPositionV3 = new Vector3()
    this.tempScaleV3 = new Vector3()
    this.tempQuat = new Quaternion()
  }

  registerEvent(
    instanceId: number,
    event: (typeof interactivityEventNames)[number],
    fun: typeof Function
  ) {
    this[event].set(instanceId, fun)
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

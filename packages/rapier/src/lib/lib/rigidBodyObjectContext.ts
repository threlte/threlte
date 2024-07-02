import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'

const key = Symbol('threlte-rapier-rigidbody-object3d')

export const useParentRigidbodyObject = (): Object3D | undefined => {
  return getContext(key)
}

export const setParentRigidbodyObject = (object3d: Object3D) => {
  setContext(key, object3d)
}

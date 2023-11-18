import { getContext, setContext } from 'svelte'

const key = Symbol('threlte-rapier-rigidbody-object3d')

export const useParentRigidbodyObject = (): THREE.Object3D | undefined => {
  return getContext(key)
}

export const setParentRigidbodyObject = (object3d: THREE.Object3D) => {
  setContext(key, object3d)
}

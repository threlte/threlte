import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'

const key = Symbol('threlte-rapier-rigidbody-object3d')

interface Context {
  readonly current: Object3D | undefined
}

export const setParentRigidbodyObject = (object3d: () => Object3D) => {
  setContext<Context>(key, {
    get current() {
      return object3d()
    }
  })
}

export const useParentRigidbodyObject = (): Context => {
  return getContext<Context>(key) ?? { current: undefined }
}

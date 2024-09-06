import { getContext, setContext } from 'svelte'
import { derived, writable, type Readable } from 'svelte/store'
import type { Object3D } from 'three'

const parentObject3DContextKey = Symbol('threlte-parent-object3d-context')
type ParentObject3DContext = Readable<Object3D | undefined>

export const createParentObject3DContext = (object?: Object3D) => {
  const parentObject3D = getContext<ParentObject3DContext | undefined>(parentObject3DContextKey)

  // If no parent object3D context is found, we are at the top level
  if (!parentObject3D) {
    const ctx = writable<Object3D | undefined>(object)
    setContext(parentObject3DContextKey, ctx)
    return ctx
  }

  // If a context is found, we still need to potentially merge it with the
  // parent context
  const object3D = writable<Object3D | undefined>(object)
  const ctx = derived([object3D, parentObject3D], ([object3D, parentObject3D]) => {
    return object3D ?? parentObject3D
  })
  setContext(parentObject3DContextKey, ctx)
  return object3D
}

export const useParentObject3D = () => {
  return getContext<ParentObject3DContext>(parentObject3DContextKey)
}

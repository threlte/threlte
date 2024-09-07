import { getContext, setContext } from 'svelte'
import { derived, readable, writable, type Readable } from 'svelte/store'
import type { Object3D } from 'three'

const parentObject3DContextKey = Symbol('threlte-parent-object3d-context')
type ParentObject3DContext = Readable<Object3D>

export const createRootParentObject3DContext = (object: Object3D) => {
  const ctx: ParentObject3DContext = readable<Object3D>(object)
  setContext(parentObject3DContextKey, ctx)
  return ctx
}

/**
 * The parentObject3D context is used to access the parent `THREE.Object3D`
 * created by a `<T>` component. The context is automatically merged with the
 * parentObject3D context of the parent component when the local context store
 * is `undefined`.
 */
export const createParentObject3DContext = (object?: Object3D) => {
  const parentObject3D = getContext<ParentObject3DContext>(parentObject3DContextKey)
  const object3D = writable<Object3D | undefined>(object)
  const ctx = derived([object3D, parentObject3D], ([object3D, parentObject3D]) => {
    return object3D ?? parentObject3D
  })
  setContext(parentObject3DContextKey, ctx)
  return object3D
}

/**
 * The parentObject3D context is used to access the parent `THREE.Object3D`
 * created by a `<T>` component.
 *
 * @example
 * ```svelte
 * <T.Mesh>
 *   <T.MeshStandardMaterial>
 *     <CustomComponent />
 *   </T.MeshStandardMaterial>
 * </T.Mesh>
 * ```
 *
 * The parentObject3D as retrieved inside the component `<CustomComponent>`
 * will be the mesh created by the `<T.Mesh>` component.
 */
export const useParentObject3D = () => {
  return getContext<ParentObject3DContext>(parentObject3DContextKey)
}

import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'
import { runeToCurrentReadable } from '../../utilities/currentWritable.js'

const parentObject3DContextKey = Symbol('threlte-parent-object3d-context')

interface ParentObject3DContext {
  current: Object3D
}

/**
 * The parentObject3D context is used to access the parent `THREE.Object3D`
 * created by a `<T>` component. The context is automatically merged with the
 * parentObject3D context of the parent component when the local context store
 * is `undefined`.
 */
export const createParentObject3DContext = (object: () => Object3D | undefined) => {
  const parentObject3D = getContext<ParentObject3DContext>(parentObject3DContextKey)

  const context = {
    get current() {
      return object() ?? parentObject3D.current
    }
  }

  setContext(parentObject3DContextKey, context)

  return context
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

/**
 * Will be removed in Threlte 9
 */
export const createParentObject3DContext_deprecated = (parent: Object3D | undefined) => {
  return createParentObject3DContext(() => parent)
}

/**
 * Will be removed in Threlte 9
 */
export const useParentObject3D_deprecated = () => {
  const parent = useParentObject3D()
  return runeToCurrentReadable(() => parent.current)
}

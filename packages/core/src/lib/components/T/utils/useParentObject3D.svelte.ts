import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'

const key = Symbol('threlte-parent-object3d-context')

interface Context {
  current: Object3D
}

export const createParentObject3D = (object: () => Object3D | undefined) => {
  const parent = useParentObject3D()

  const ctx: Context = {
    get current() {
      return object() ?? parent.current
    }
  }

  setContext(key, ctx)

  return ctx
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
  return getContext<Context>(key)
}

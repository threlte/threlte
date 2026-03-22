import { getContext, setContext } from 'svelte'

const parentContextKey = Symbol('threlte-parent-context')

interface Context {
  current: unknown
}

/**
 * The parent context is used to access the parent object created by a `<T>`
 * component.
 */
export const createParent = <T>(parent: () => T) => {
  const context: Context = {
    get current() {
      return parent()
    }
  }

  setContext(parentContextKey, context)

  return context
}

/**
 * The parent context is used to access the parent object created by a `<T>`
 * component.
 *
 * @example
 * ```svelte
 * <T.Mesh>
 *   <CustomComponent />
 * </T.Mesh>
 * ```
 *
 * The parent as retrieved inside the component `<CustomComponent>`
 * will be the mesh created by the `<T.Mesh>` component.
 */
export const useParent = () => {
  const parent = getContext<Context>(parentContextKey)
  return parent
}

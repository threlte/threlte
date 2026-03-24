import { getContext, setContext } from 'svelte'
import { currentWritable, type CurrentWritable } from '../../utilities/index.js'

const parentContextKey = Symbol('threlte-parent-context')

type ParentContext = CurrentWritable<unknown>

/**
 * The parent context is used to access the parent object created by a `<T>`
 * component.
 */
export const createParentContext = <T>(parent?: T) => {
  const ctx: ParentContext = currentWritable(parent)
  setContext(parentContextKey, ctx)
  return ctx
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
  const parent = getContext<ParentContext>(parentContextKey)
  return parent
}

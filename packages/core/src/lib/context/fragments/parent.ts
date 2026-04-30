import { getContext, setContext } from 'svelte'
import { runeToCurrentReadable } from '../../utilities/currentWritable.js'

const parentContextKey = Symbol('threlte-parent-context')

interface ParentContext {
  current: unknown
}

/**
 * The parent context is used to access the parent object created by a `<T>`
 * component.
 */
export const createParentContext = <T>(parent: () => T | undefined) => {
  const context = {
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
  return getContext<ParentContext>(parentContextKey)
}

/** Will be removed in Threlte 9 */
type MaybeParentGetter<T> = T | undefined | (() => T | undefined)

/** Will be removed in Threlte 9 */
export const createParentContext_deprecated = <T>(parent: MaybeParentGetter<T>) => {
  const getParent = typeof parent === 'function' ? (parent as () => T | undefined) : () => parent

  return createParentContext(getParent)
}

/** Will be removed in Threlte 9 */
export const useParent_deprecated = () => {
  const parent = useParent()
  return runeToCurrentReadable(() => parent.current)
}

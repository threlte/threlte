import { getContext, setContext } from 'svelte'
import { currentWritable, type CurrentWritable } from '../../lib/storeUtils'

const parentContextKey = Symbol('threlte-parent-context')

type ParentContext = CurrentWritable<unknown>

export const createParentContext = <T>(parent?: T) => {
  const ctx: ParentContext = currentWritable(parent)
  setContext(parentContextKey, ctx)
  return ctx
}

export const useParent = () => {
  const parent = getContext<ParentContext>(parentContextKey)
  return parent
}

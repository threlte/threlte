import { getContext, setContext } from 'svelte'
import { currentWritable, type CurrentWritable } from '../../utilities/index.js'

export type ThrelteUserContext = CurrentWritable<Record<string | symbol, unknown>>

export const createUserContext = () => {
  const userCtx: ThrelteUserContext = currentWritable({})

  setContext<ThrelteUserContext>('threlte-user-context', userCtx)

  return userCtx
}

/**
 * ### `useUserContext`
 *
 * @returns The user context store. The context is to be used with
 * `useThrelteUserContext` to set and get the user context.
 */
export const useUserContext = (): ThrelteUserContext => {
  const context = getContext<ThrelteUserContext>('threlte-user-context')

  if (!context) {
    throw new Error('useUserContext can only be used in a child component to <Canvas>.')
  }

  return context
}

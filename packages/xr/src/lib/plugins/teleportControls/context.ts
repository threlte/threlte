import { getContext, setContext } from 'svelte'
import type { Context } from './types'

const contextKey = Symbol('teleport-controls-context')

export const getTeleportContext = () => {
  return getContext<Context>(contextKey)
}

export const setTeleportContext = (context: Context) => {
  setContext(contextKey, context)
}

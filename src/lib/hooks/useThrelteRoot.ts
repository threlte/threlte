import { getContext } from 'svelte'
import type { ThrelteRootContext } from '../types/types'

export const useThrelteRoot = (): ThrelteRootContext => {
  return getContext<ThrelteRootContext>('threlte-root')
}

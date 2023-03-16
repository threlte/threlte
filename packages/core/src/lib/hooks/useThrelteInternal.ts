import { getContext } from 'svelte'
import type { ThrelteInternalContext } from '../types/types'

export const useThrelteInternal = (): ThrelteInternalContext => {
  return getContext<ThrelteInternalContext>('threlte-internal-context')
}

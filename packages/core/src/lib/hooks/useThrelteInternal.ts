import { getContext } from 'svelte'
import type { ThrelteInternalContext } from '../lib/contexts'

export const useThrelteInternal = (): ThrelteInternalContext => {
  return getContext<ThrelteInternalContext>('threlte-internal-context')
}

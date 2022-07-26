import { getContext } from 'svelte'
import type { ThrelteDisposalContext } from '../types/types'

export const useThrelteDisposal = (): ThrelteDisposalContext => {
  return getContext<ThrelteDisposalContext>('threlte-disposal-context')
}

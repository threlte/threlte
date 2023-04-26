import { getContext } from 'svelte'
import type { ThrelteContext } from '../lib/contexts'

export const useThrelte = (): ThrelteContext => {
  return getContext<ThrelteContext>('threlte')
}

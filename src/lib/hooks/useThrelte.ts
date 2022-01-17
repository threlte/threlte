import { getContext } from 'svelte'
import type { ThrelteContext } from '../types/types'

export const useThrelte = (): ThrelteContext => {
  return getContext<ThrelteContext>('threlte')
}

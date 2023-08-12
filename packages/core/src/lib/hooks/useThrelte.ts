import { getContext } from 'svelte'
import type { ThrelteContext } from '../lib/contexts'

export const useThrelte = (): ThrelteContext => {
  const context = getContext<ThrelteContext>('threlte')

  if (context === undefined) {
    throw new Error('No Threlte context found, are you using this hook inside of <Canvas>?')
  }

  return context
}

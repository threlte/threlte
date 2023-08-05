import { getContext } from 'svelte'
import type { ThrelteContext } from '../lib/contexts'

export const useThrelte = (): ThrelteContext => {
  const context = getContext<ThrelteContext>('threlte')

  if (context.renderer === undefined) {
    throw new Error('WebGLRenderer is undefined, is this component a child of <Canvas>?')
  }

  return context
}

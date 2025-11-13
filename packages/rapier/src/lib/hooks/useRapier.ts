import { getContext } from 'svelte'
import type { RapierContext } from '../types/types.js'

export const useRapier = (): RapierContext => {
  return getContext<RapierContext>('threlte-rapier-context')
}

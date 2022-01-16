import { getContext } from 'svelte'
import type { ThrelteRootContext } from '../lib/types'

export const useThrelteRoot = (): ThrelteRootContext => {
	return getContext<ThrelteRootContext>('threlte-root')
}

import { getContext } from 'svelte'
import type { ThrelteRootContext } from './types'

export const useThrelteRoot = () => {
	return getContext<ThrelteRootContext>('threlte-root')
}

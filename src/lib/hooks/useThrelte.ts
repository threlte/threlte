import { getContext } from 'svelte'
import type { ThrelteContext } from '../lib/types'

export const useThrelte = (): ThrelteContext => {
	return getContext<ThrelteContext>('threlte')
}

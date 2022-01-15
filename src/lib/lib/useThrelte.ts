import { getContext } from 'svelte'
import type { ThrelteContext } from './types'

export const useThrelte = () => {
	return getContext<ThrelteContext>('threlte')
}

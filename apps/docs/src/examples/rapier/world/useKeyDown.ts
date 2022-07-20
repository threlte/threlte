import { browser } from '$app/env'
import { onDestroy } from 'svelte'

export const useKeyDown = (key: string, callback: (e: KeyboardEvent) => void) => {
	if (!browser) return

	const proxy = (e: KeyboardEvent) => {
		if (e.key === key) callback(e)
	}

	window.addEventListener('keydown', proxy)
	onDestroy(() => {
		window.removeEventListener('keydown', proxy)
	})
}

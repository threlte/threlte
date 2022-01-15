import { browser } from '$app/env'
import { onDestroy } from 'svelte'

export const useRaf = (cb: () => void): void => {
	if (!browser) return
	let handle: ReturnType<typeof requestAnimationFrame> | undefined

	const tick = () => {
		cb()
		handle = requestAnimationFrame(tick)
	}

	tick()

	onDestroy(() => {
		if (!handle) return
		cancelAnimationFrame(handle)
	})
}

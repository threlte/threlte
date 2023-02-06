import { onDestroy } from 'svelte'
import { derived, get, writable } from 'svelte/store'

export const useWasd = () => {
	const wasdKeys = writable({
		w: false,
		a: false,
		s: false,
		d: false
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (!Object.keys(get(wasdKeys)).includes(e.key)) return
		wasdKeys.update((keys) => {
			keys[e.key as keyof typeof keys] = true
			return keys
		})
	}

	const onKeyUp = (e: KeyboardEvent) => {
		if (!Object.keys(get(wasdKeys)).includes(e.key)) return
		wasdKeys.update((keys) => {
			keys[e.key as keyof typeof keys] = false
			return keys
		})
	}

	const wasd = derived(wasdKeys, (wasdKeys) => {
		return {
			x: 0 + (wasdKeys.d ? 1 : 0) - (wasdKeys.a ? 1 : 0),
			y: 0 + (wasdKeys.w ? 1 : 0) - (wasdKeys.s ? 1 : 0)
		}
	})

	window.addEventListener('keydown', onKeyDown)
	window.addEventListener('keyup', onKeyUp)
	onDestroy(() => {
		window.removeEventListener('keydown', onKeyDown)
		window.removeEventListener('keyup', onKeyUp)
	})

	return wasd
}

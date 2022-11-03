import { derived, writable } from 'svelte/store'
import { Color } from 'three'

export const gameStarted = writable<boolean>(false)
export const points = writable<number>(0)
export const lives = writable<number>(3)
export const gameOver = derived([gameStarted, lives], ([started, lives]) => {
	return started && lives <= 0
})
export const averageScreenColor = writable<Color>(new Color())

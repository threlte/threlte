import { derived, get, writable } from 'svelte/store'
import { Color } from 'three'
import { levels } from './levels'

export type GameState =
	| 'intro'
	| 'await-intro-skip'
	| 'menu'
	| 'game-over'
	| 'await-ball-spawn'
	| 'playing'
	| 'level-loading'
	| 'level-complete'
	| 'outro'

const state = writable<GameState>('intro')
const levelIndex = writable<number>(0)
const score = writable(0)
const gameOver = writable(false)
const playerPosition = writable(0)
const ballPosition = writable({
	x: 0,
	z: 0
})
const baseColor = derived(state, (state) => {
	if (state === 'outro') return 'green'
	return 'red'
})

export const gameState = {
	state,
	levelIndex,
	score,
	gameOver,
	playerPosition,
	ballPosition,
	baseColor
}

export const restart = () => {
	reset()
	gameState.state.set('menu')
}

export const reset = () => {
	gameState.state.set('intro')
	gameState.levelIndex.set(0)
	gameState.gameOver.set(false)
	gameState.score.set(0)
	gameState.playerPosition.set(0)
	gameState.ballPosition.set({
		x: 0,
		z: 0
	})
}

export const nextLevel = () => {
	if (get(gameState.levelIndex) < levels.length - 1) {
		gameState.levelIndex.update((levelIndex) => levelIndex + 1)
		gameState.state.set('level-loading')
	} else {
		gameState.state.set('outro')
	}
}

/**
 * Optionally resets the game and starts it again
 */
export const startGame = () => {
	gameState.state.set('level-loading')
}

export const blinkClock = writable<0 | 1>(0)

/**
 * Used for the light that emits the screen color and luminosity
 */
export const averageScreenColor = writable<Color>(new Color())

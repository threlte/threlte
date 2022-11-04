import { onDestroy } from 'svelte'
import { get, writable } from 'svelte/store'
import { Color } from 'three'

export type GameState =
	| 'menu'
	| 'game-over'
	| 'await-ball-spawn'
	| 'playing'
	| 'level-loading'
	| 'level-complete'

export const gameState = {
	state: writable<GameState>('menu'),
	level: writable<number>(1),
	score: writable(0),
	gameOver: writable(false),
	playerPosition: writable(0),
	ballPosition: writable({
		x: 0,
		z: 0
	}),
	ballCanBeSpawned: writable(false)
}

export const reset = () => {
	gameState.state.set('menu')
	gameState.level.set(1)
	gameState.gameOver.set(false)
	gameState.score.set(0)
	gameState.ballCanBeSpawned.set(false)
}

/**
 * Optionally resets the game and starts it again
 */
export const startGame = () => {
	gameState.state.set('await-ball-spawn')
}

export const blinkClock = writable<0 | 1>(0)

/**
 * Used for the light that emits the screen color and luminosity
 */
export const averageScreenColor = writable<Color>(new Color())

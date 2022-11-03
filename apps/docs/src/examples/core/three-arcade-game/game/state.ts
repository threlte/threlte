import { writable } from 'svelte/store'
import { Color } from 'three'

export type GameState = 'menu' | 'game-over' | 'playing' | 'level-loading' | 'level-complete'

export const gameState = {
	state: writable<GameState>('menu'),
	score: writable(0),
	gameOver: writable(false),
	level: writable(1),
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
	gameState.state.set('level-loading')
}

/**
 * Used for the light that emits the screen color and luminosity
 */
export const averageScreenColor = writable<Color>(new Color())

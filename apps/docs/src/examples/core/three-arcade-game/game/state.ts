import { get, writable } from 'svelte/store'
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
	| 'game-complete'

export const gameState = {
	state: writable<GameState>('intro'),
	levelIndex: writable<number>(0),
	score: writable(0),
	gameOver: writable(false),
	playerPosition: writable(0),
	ballPosition: writable({
		x: 0,
		z: 0
	}),
	baseColor: writable('red')
}

gameState.state.subscribe((state) => {
	console.log('STAATE', state)
})

export const reset = () => {
	gameState.state.set('menu')
	gameState.levelIndex.set(0)
	gameState.gameOver.set(false)
	gameState.score.set(0)
	gameState.playerPosition.set(0)
	gameState.ballPosition.set({
		x: 0,
		z: 0
	})
	gameState.baseColor.set('red')
}

export const nextLevel = () => {
	if (get(gameState.levelIndex) < levels.length - 1) {
		gameState.levelIndex.update((levelIndex) => levelIndex + 1)
		gameState.state.set('level-loading')
	} else {
		gameState.state.set('game-complete')
		gameState.baseColor.set('green')
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

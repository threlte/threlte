import { derived, get, writable } from 'svelte/store'
import { Color, PerspectiveCamera, Scene, Texture } from 'three'
import { levels } from './levels'
import type { RigidBody } from '@dimforge/rapier3d-compat'

export type GameState =
  | 'off'
  | 'intro'
  | 'await-intro-skip'
  | 'menu'
  | 'game-over'
  | 'await-ball-spawn'
  | 'playing'
  | 'level-loading'
  | 'level-complete'
  | 'outro'

const state = writable<GameState>('off')
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
const muted = writable(false)
export const blinkClock = writable<0 | 1>(0)
const arcadeMachineScene = writable<Scene | undefined>(undefined)
const averageScreenColor = writable<Color>(new Color('black'))
const gameScene = writable<Scene | undefined>(undefined)
const gameCamera = writable<PerspectiveCamera | undefined>(undefined)
const gameTexture = writable<Texture | undefined>(undefined)
const ballRigidBody = writable<RigidBody | undefined>(undefined)
const debug = writable(false)
const orbitControls = writable(false)

export const gameState = {
  state,
  levelIndex,
  score,
  gameOver,
  playerPosition,
  ballPosition,
  baseColor,
  muted,
  gameScene,
  gameCamera,
  averageScreenColor,
  arcadeMachineScene,
  gameTexture,
  ballRigidBody,
  debug,
  orbitControls
}

// ------------- METHODS -------------
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

state.subscribe((state) => {
  console.log('state', state)
})

export const nextLevel = () => {
  if (get(gameState.levelIndex) < levels.length - 1) {
    gameState.levelIndex.update((levelIndex) => levelIndex + 1)
    gameState.state.set('level-loading')
  } else {
    gameState.state.set('outro')
  }
}

export const switchOff = () => {
  reset()
  state.set('off')
}

/**
 * Optionally resets the game and starts it again
 */
export const startGame = () => {
  gameState.state.set('level-loading')
}

export const debugValue = writable(0.5)

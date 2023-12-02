import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import { gameState, type GameState } from '../state'

export const useGameStateChanged = (
  callback: (newState: GameState, previousState: GameState) => void
) => {
  const { state } = gameState

  let previousState = get(state)
  const unsubscribeGameState = state.subscribe((state) => {
    if (state !== previousState) {
      callback(state, previousState)
      previousState = state
    }
  })

  onDestroy(unsubscribeGameState)
}

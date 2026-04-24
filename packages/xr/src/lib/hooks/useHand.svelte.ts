import type { XRHandObject } from '../types.js'
import { getHandState, type XRHandSourceState } from '../internal/inputSources.svelte.js'
import { runeToCurrentReadable, type CurrentReadable } from './currentReadable.svelte.js'

const handObjects = new WeakMap<XRHandSourceState, XRHandObject>()

const toXRHandObject = (state: XRHandSourceState | undefined): XRHandObject | undefined => {
  if (state === undefined) return undefined

  let hand = handObjects.get(state)
  if (hand !== undefined) return hand

  hand = {
    targetRay: state.targetRay,
    hand: state.hand,
    model: state.model,
    inputSource: state.inputSource.hand
  }
  handObjects.set(state, hand)
  return hand
}

class Hands {
  get left() {
    return toXRHandObject(getHandState('left'))
  }

  get right() {
    return toXRHandObject(getHandState('right'))
  }
}

export const hands = new Hands()

/**
 * Provides a reference to a current XRHand, filtered by handedness.
 */
export const useHand = (
  handedness: 'left' | 'right'
): CurrentReadable<undefined | XRHandObject> => {
  switch (handedness) {
    case 'left':
      return runeToCurrentReadable(() => hands.left)
    case 'right':
      return runeToCurrentReadable(() => hands.right)
    default:
      throw new Error('useHand handedness must be left or right.')
  }
}

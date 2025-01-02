import { SvelteSet } from 'svelte/reactivity'
import type { StudioState } from '../../state/StudioState'

const staticStates = new SvelteSet<StudioState>()

export const addStaticState = (state: StudioState) => {
  staticStates.add(state)
}

export const removeStaticState = (state: StudioState) => {
  staticStates.delete(state)
}

export const getStaticStates = () => {
  return staticStates
}

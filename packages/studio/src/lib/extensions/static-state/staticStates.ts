import { SvelteSet } from 'svelte/reactivity'
import type { StudioState } from '../../state/StudioState'

const staticStates = new SvelteSet<StudioState>()

export function addStaticState(state: StudioState) {
  staticStates.add(state)
}

export function removeStaticState(state: StudioState) {
  staticStates.delete(state)
}

export function getStaticStates() {
  return staticStates
}

import { SvelteSet } from 'svelte/reactivity'
import type { StaticState } from './StaticState'

const staticStates = new SvelteSet<StaticState>()

export const addStaticState = (state: StaticState) => {
  staticStates.add(state)
}

export const removeStaticState = (state: StaticState) => {
  staticStates.delete(state)
}

export const getStaticStates = () => {
  return staticStates
}

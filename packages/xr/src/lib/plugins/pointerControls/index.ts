import { currentWritable } from '@threlte/core'
import { setContext } from 'svelte'
import { readable } from 'svelte/store'
import { Raycaster, Vector3 } from 'three'
import { getDefaultComputeFunction } from './defaults'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setupPointerControls'
import type { PointerControlsOptions, State } from './types'

export const pointerControls = (hand: 'left' | 'right', options?: PointerControlsOptions) => {
  const state: State = {
    hand: readable(hand),
    enabled: currentWritable(options?.enabled ?? true),
    pointer: currentWritable(new Vector3()),
    pointerOverTarget: currentWritable(false),
    lastEvent: undefined,
    raycaster: new Raycaster(),
    initialClick: [0, 0, 0],
    initialHits: [],
    hovered: new Map(),
    interactiveObjects: [],
    compute: () => { /* will be replaced by the default or the user-provided function */ }, 
    filter: options?.filter
  }

  state.compute = options?.compute ?? getDefaultComputeFunction(state)

  setContext<State>('threlte-pointer-controls-context', state)

  injectPointerControlsPlugin()
  setupPointerControls(state)

  return state
}


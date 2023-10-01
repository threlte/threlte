import { currentWritable } from '@threlte/core'
import { setContext } from 'svelte'
import { readable } from 'svelte/store'
import { Raycaster, Vector3 } from 'three'
import { getDefaultComputeFunction } from './defaults'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setupPointerControls'
import type { PointerControlsOptions, State } from './types'

export const pointerControls = (options?: PointerControlsOptions) => {
  injectPointerControlsPlugin()

  return (['left', 'right'] as const).map((hand) => {
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
      compute: options?.compute ?? getDefaultComputeFunction(),
      filter: options?.filter
    }
  
    setContext<State>(`threlte-pointer-controls-context-${hand}`, state)

    setupPointerControls(state)  

    return state
  }) as [left: State, right: State]
}

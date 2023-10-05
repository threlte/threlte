import { Raycaster, Vector3 } from 'three'
import { setContext } from 'svelte'
import { readable } from 'svelte/store'
import { currentWritable, watch } from '@threlte/core'
import { getDefaultComputeFunction } from './defaults'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setupPointerControls'
import { hasPointerControls } from '../../internal/stores'
import type { PointerControlsOptions, State } from './types'

export const pointerControls = (options?: PointerControlsOptions) => {
  injectPointerControlsPlugin()
  setContext(`threlte-pointer-controls-context`, { interactiveObjects: [] })

  const createHandState = (hand: 'left' | 'right') => {
    const handState: State = {
      hand: readable(hand),
      enabled: currentWritable(options?.enabled ?? true),
      pointerOverTarget: currentWritable(false),
      lastEvent: undefined,
      raycaster: new Raycaster(),
      initialClick: [0, 0, 0],
      initialHits: [],
      hovered: new Map(),
      compute: options?.compute ?? getDefaultComputeFunction(hand),
      filter: options?.filter
    }
  
    setContext<State>(`threlte-pointer-controls-context-${hand}`, handState)

    setupPointerControls(handState)  

    return handState
  }

  const state = {
    left: createHandState('left'),
    right: createHandState('right')
  }

  watch([state.left.enabled, state.right.enabled], ([leftEnabled, rightEnabled]) => {
    hasPointerControls.set(leftEnabled || rightEnabled)
  })

  return state
}

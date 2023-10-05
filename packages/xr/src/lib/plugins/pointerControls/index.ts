import { Raycaster } from 'three'
import { setContext } from 'svelte'
import { readable } from 'svelte/store'
import { currentWritable, watch } from '@threlte/core'
import { getDefaultComputeFunction } from './defaults'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setupPointerControls'
import { hasPointerControls } from '../../internal/stores'
import type { PointerControlsOptions, HandState, State } from './types'

export const pointerControls = (options?: PointerControlsOptions) => {
  injectPointerControlsPlugin()

  const state = {
    interactiveObjects: [],
    raycaster: new Raycaster(),
    compute: options?.compute ?? getDefaultComputeFunction(),
    filter: options?.filter
  }

  setContext<State>(`threlte-pointer-controls-context`, state)

  const createHandState = (hand: 'left' | 'right') => {
    const handState: HandState = {
      hand,
      enabled: currentWritable(options?.enabled ?? true),
      pointerOverTarget: currentWritable(false),
      lastEvent: undefined,
      initialClick: [0, 0, 0],
      initialHits: [],
      hovered: new Map(),
    }
  
    setContext<HandState>(`threlte-pointer-controls-context-${hand}`, handState)

    setupPointerControls(state, handState)  

    return handState
  }

  console.log('hi')

  const left = createHandState('left')
  const right = createHandState('right')

  watch([left.enabled, right.enabled], ([leftEnabled, rightEnabled]) => {
    hasPointerControls.set(leftEnabled || rightEnabled)
  })

  return { left, right }
}

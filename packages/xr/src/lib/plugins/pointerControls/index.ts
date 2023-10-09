import { Raycaster } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { getDefaultComputeFunction } from './defaults'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setupPointerControls'
import { setControlsContext, setHandContext } from './context'
import { hasPointerControls } from '../../internal/stores'
import type { PointerControlsOptions, HandState } from './types'

export const pointerControls = (options?: PointerControlsOptions) => {
  injectPointerControlsPlugin()

  const state = {
    interactiveObjects: [],
    raycaster: new Raycaster(),
    compute: options?.compute ?? getDefaultComputeFunction(),
    filter: options?.filter
  }

  setControlsContext(state)

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

    setHandContext(hand, handState)
  
    setupPointerControls(state, handState)  

    return handState
  }

  const left = createHandState('left')
  const right = createHandState('right')

  watch([left.enabled, right.enabled], ([leftEnabled, rightEnabled]) => {
    hasPointerControls.set(leftEnabled || rightEnabled)
  })

  return { left, right }
}

import { Raycaster } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { getDefaultComputeFunction } from './defaults'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setupPointerControls'
import { setControlsContext, setHandContext } from './context'
import { hasPointerControls } from '../../internal/stores'
import type { PointerControlsOptions, HandState } from './types'

export const pointerControls = (options?: PointerControlsOptions) => {
  const context = {
    interactiveObjects: [],
    raycaster: new Raycaster(),
    compute: options?.compute ?? getDefaultComputeFunction(),
    filter: options?.filter
  }

  setControlsContext(context)
  injectPointerControlsPlugin()

  const createHandContext = (hand: 'left' | 'right') => {
    const handContext: HandState = {
      hand,
      enabled: currentWritable(options?.enabled ?? true),
      pointerOverTarget: currentWritable(false),
      lastEvent: undefined,
      initialClick: [0, 0, 0],
      initialHits: [],
      hovered: new Map(),
    }

    setHandContext(hand, handContext)
    setupPointerControls(context, handContext)  

    return handContext
  }

  const left = createHandContext('left')
  const right = createHandContext('right')

  watch([left.enabled, right.enabled], ([leftEnabled, rightEnabled]) => {
    hasPointerControls.set(leftEnabled || rightEnabled)
  })

  return { left, right, state: context }
}

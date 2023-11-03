import { Raycaster, Vector3 } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { getDefaultComputeFunction } from './defaults'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setup'
import { setControlsContext, setHandContext } from './context'
import { hasPointerControls } from '../../internal/stores'
import type { PointerControlsOptions, HandState, State } from './types'

export const context: State = {
  interactiveObjects: [],
  raycaster: new Raycaster(),
  compute: getDefaultComputeFunction(),
  filter: undefined,
}

export const handContext: {
  left: HandState
  right: HandState
} = {
  left: {
    hand: 'left',
    enabled: currentWritable(true),
    pointer: currentWritable(new Vector3()),
    pointerOverTarget: currentWritable(false),
    lastEvent: undefined,
    initialClick: [0, 0, 0],
    initialHits: [],
    hovered: new Map(),
  },
  right: {
    hand: 'right',
    enabled: currentWritable(true),
    pointer: currentWritable(new Vector3()),
    pointerOverTarget: currentWritable(false),
    lastEvent: undefined,
    initialClick: [0, 0, 0],
    initialHits: [],
    hovered: new Map(),
  },
}

export const pointerControls = (options?: PointerControlsOptions) => {
  if (options?.compute) context.compute = options.compute
  if (options?.filter) context.filter = options.filter

  setControlsContext(context)
  injectPointerControlsPlugin()

  const createHandContext = (hand: 'left' | 'right') => {
    setHandContext(hand, handContext[hand])
    setupPointerControls(context, handContext[hand])  
    return handContext[hand]
  }

  const left = createHandContext('left')
  const right = createHandContext('right')

  watch([left.enabled, right.enabled], ([leftEnabled, rightEnabled]) => {
    hasPointerControls.set(leftEnabled || rightEnabled)
  })

  return { left, right, state: context }
}

import { Raycaster, Vector3 } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { defaultComputeFunction } from './compute'
import { injectPointerControlsPlugin } from './plugin'
import { setupPointerControls } from './setup'
import { setControlsContext, setHandContext } from './context'
import { hasPointerControls } from '../../internal/stores'
import type { PointerControlsOptions, ControlsContext, HandContext } from './types'

export const context: ControlsContext = {
  interactiveObjects: [],
  raycaster: new Raycaster(),
  compute: defaultComputeFunction,
  filter: undefined,
}

export const handContext: {
  left: HandContext
  right: HandContext
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
  if (options?.compute !== undefined) context.compute = options.compute
  if (options?.filter !== undefined) context.filter = options.filter

  setControlsContext(context)
  injectPointerControlsPlugin()

  const createHandContext = (hand: 'left' | 'right') => {
    setHandContext(hand, handContext[hand])
    setupPointerControls(context, handContext[hand])  
    return handContext[hand]
  }

  const left = createHandContext('left')
  const right = createHandContext('right')

  if (options?.enabled !== undefined) {
    left.enabled.set(options.enabled)
    right.enabled.set(options.enabled)
  }

  watch([left.enabled, right.enabled], ([leftEnabled, rightEnabled]) => {
    hasPointerControls.set(leftEnabled || rightEnabled)
  })

  return { left, right, state: context }
}

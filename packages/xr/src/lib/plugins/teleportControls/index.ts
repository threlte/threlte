import { Raycaster } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { setTeleportContext, type Context, type HandContext, type ComputeFunction } from './context'
import { injectTeleportControlsPlugin } from './plugin'
import { hasTeleportControls } from '../../internal/stores'
import { defaultComputeFunction } from './compute'
import { setHandContext } from './context'
import { setupTeleportControls } from './setup'

export interface TeleportControlsOptions {
  enabled?: boolean
  compute?: ComputeFunction
  /**
   * @default 1 / 30
   */
  fixedStep?: number
}

export const context: Context = {
  interactiveObjects: [],
  surfaces: new Map(),
  blockers: new Map(),
  dispatchers: new WeakMap(),
  raycaster: new Raycaster(),
  compute: defaultComputeFunction,
}

export const handContext: {
  left: HandContext
  right: HandContext
} = {
  left: {
    hand: 'left',
    selecting: currentWritable(false),
    enabled: currentWritable(true),
    hovered: currentWritable(undefined),
  },
  right: {
    hand: 'right',
    selecting: currentWritable(false),
    enabled: currentWritable(true),
    hovered: currentWritable(undefined),
  }
}

export const teleportControls = (options?: TeleportControlsOptions) => {
  if (options?.compute !== undefined) context.compute = options.compute

  setTeleportContext(context)
  injectTeleportControlsPlugin()

  const createHandContext = (hand: 'left' | 'right') => {
    setHandContext(hand, handContext[hand])
    setupTeleportControls(context, handContext[hand], options?.fixedStep)
    return handContext[hand]
  }

  const left = createHandContext('left')
  const right = createHandContext('right')

  if (options?.enabled !== undefined) {
    left.enabled.set(options.enabled)
    right.enabled.set(options.enabled)
  }

  watch([left.enabled, right.enabled], ([leftEnabled, rightEnabled]) => {
    hasTeleportControls.set(leftEnabled || rightEnabled)
  })

  return {
    left,
    right,
    state: context,
  }
}

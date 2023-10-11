import { Raycaster } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { setTeleportContext } from './context'
import type { Context, HandContext } from './types'
import { injectTeleportControlsPlugin } from './plugin'
import { hasTeleportControls } from '../../internal/stores'
import { getDefaultComputeFunction } from './defaults'
import { setHandContext } from './context'
import { setupTeleportControls } from './setup'

export type TeleportControlsOptions = {
  enabled?: boolean
}

export const context: Context = {
  interactiveObjects: [],
  surfaces: new Map(),
  blockers: new Map(),
  dispatchers: new WeakMap(),
  raycaster: new Raycaster(),
  compute: getDefaultComputeFunction()
}

export const handContext: {
  left: HandContext
  right: HandContext
} = {
  left: {
    hand: 'left',
    enabled: currentWritable(false),
    hovered: currentWritable(undefined),
  },
  right: {
    hand: 'right',
    enabled: currentWritable(false),
    hovered: currentWritable(undefined),
  }
}

export const teleportControls = (options?: TeleportControlsOptions) => {
  setTeleportContext(context)
  injectTeleportControlsPlugin()

  const createHandContext = (hand: 'left' | 'right') => {
    setHandContext(hand, handContext[hand])
    setupTeleportControls(context, handContext[hand])
    return handContext[hand]
  }

  const left = createHandContext('left')
  const right = createHandContext('right')

  watch([left.enabled, right.enabled], ([leftEnabled, rightEnabled]) => {
    hasTeleportControls.set(leftEnabled || rightEnabled)
  })

  return { left, right, state: context }
}

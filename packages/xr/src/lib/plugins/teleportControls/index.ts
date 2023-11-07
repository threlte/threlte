import { Raycaster } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { setTeleportContext, getTeleportContext, type ComputeFunction, getHandContext } from './context'
import { injectTeleportControlsPlugin } from './plugin'
import { defaultComputeFunction } from './compute'
import { setHandContext } from './context'
import { setupTeleportControls } from './setup'
import { teleportState } from '../../internal/stores'

export interface TeleportControlsOptions {
  enabled?: boolean
  compute?: ComputeFunction
  /**
   * @default 1 / 30
   */
  fixedStep?: number
}

let controlsCounter = 0

export const teleportControls = (handedness: 'left' | 'right', options?: TeleportControlsOptions) => {
  if (getTeleportContext() === undefined) {
    injectTeleportControlsPlugin()

    setTeleportContext({
      interactiveObjects: [],
      surfaces: new Map(),
      blockers: new Map(),
      dispatchers: new WeakMap(),
      raycaster: new Raycaster(),
      compute: options?.compute ?? defaultComputeFunction,
    })
  } 

  const context = getTeleportContext()

  if (getHandContext(handedness) === undefined) {
    const enabled = options?.enabled ?? true

    controlsCounter += (enabled ? 1 : -1)
  
    setHandContext(handedness, {
      hand: 'left',
      selecting: currentWritable(false),
      enabled: currentWritable(enabled),
      hovered: currentWritable(undefined),
    })
  }

  const handContext = getHandContext(handedness)

  setupTeleportControls(context, handContext, options?.fixedStep)

  watch(handContext.enabled, (enabled) => {
    controlsCounter += (enabled ? 1 : -1)
    teleportState.update((value) => {
      value.enabled = controlsCounter > 0
      return value
    })
  })

  watch(handContext.hovered, (hovered) => {
    teleportState.update((value) => {
      value.intersection[handedness] = hovered
      return value
    })
  })

  watch(handContext.selecting, (selecting) => {
    teleportState.update((value) => {
      value.selecting = selecting
      return value
    })
  })

  return { context, handContext }
}

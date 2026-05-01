import { Raycaster } from 'three'
import { currentWritable, observe } from '@threlte/core'
import {
  createTeleportContext,
  useTeleportControls,
  type ComputeFunction,
  getHandContext,
  type HandContext
} from './context.js'
import { injectTeleportControlsPlugin } from './plugin.svelte.js'
import { setHandContext } from './context.js'
import { setupTeleportControls } from './setup.svelte.js'
import { defaultComputeFunction } from './compute.js'
import { teleportState } from '../../internal/state.svelte.js'

export interface TeleportControlsOptions {
  enabled?: boolean

  /**
   * The compute function is responsible for updating the state of the pointerControls plugin.
   * It needs to set up the raycaster and the pointer vector. If no compute function is provided,
   * the plugin will use the default compute function.
   */
  compute?: ComputeFunction

  /**
   * @default 1 / 30
   */
  fixedStep?: number
}

export const teleportControls = (
  handedness: 'left' | 'right',
  options?: TeleportControlsOptions
) => {
  if (useTeleportControls() === undefined) {
    injectTeleportControlsPlugin()
    createTeleportContext()
  }

  const context = useTeleportControls()

  if (getHandContext(handedness) === undefined) {
    const ctx: HandContext = {
      hand: handedness,
      active: currentWritable(false),
      enabled: currentWritable(options?.enabled ?? true),
      hovered: currentWritable(undefined),
      raycaster: new Raycaster(),
      compute: options?.compute ?? defaultComputeFunction
    }

    setHandContext(handedness, ctx)

    setupTeleportControls(context, ctx, options?.fixedStep)
  }

  const handContext = getHandContext(handedness)

  observe.pre(
    () => [handContext.enabled],
    ([enabled]) => {
      teleportState[handedness].enabled = enabled
    }
  )

  observe.pre(
    () => [handContext.active],
    ([hovering]) => {
      teleportState[handedness].hovering = hovering
    }
  )

  return {
    enabled: handContext.enabled,
    hovered: handContext.hovered,
    active: handContext.active
  }
}

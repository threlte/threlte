import { currentWritable, watch } from '@threlte/core'
import {
  createTeleportContext,
  useTeleportControls,
  type ComputeFunction,
  getHandContext,
  type HandContext
} from './context'
import { injectTeleportControlsPlugin } from './plugin'
import { setHandContext } from './context'
import { setupTeleportControls } from './setup'
import { teleportState } from '../../internal/stores'

let controlsCounter = 0

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

    createTeleportContext(options?.compute)
  }

  const context = useTeleportControls()

  if (getHandContext(handedness) === undefined) {
    const enabled = options?.enabled ?? true

    controlsCounter += enabled ? 1 : -1

    const ctx: HandContext = {
      hand: handedness,
      active: currentWritable(false),
      enabled: currentWritable(enabled),
      hovered: currentWritable(undefined)
    }

    setHandContext(handedness, ctx)

    setupTeleportControls(context, ctx, options?.fixedStep)
  }

  const handContext = getHandContext(handedness)

  watch(handContext.enabled, (enabled) => {
    controlsCounter += enabled ? 1 : -1
    teleportState.update((value) => {
      value[handedness].enabled = controlsCounter > 0
      return value
    })
  })

  watch(handContext.active, (hovering) => {
    teleportState.update((value) => {
      value[handedness].hovering = hovering
      return value
    })
  })

  return {
    enabled: handContext.enabled,
    hovered: handContext.hovered,
    active: handContext.active
  }
}

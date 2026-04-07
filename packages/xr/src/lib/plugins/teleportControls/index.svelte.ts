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
import { teleportState } from '../../internal/state.svelte.js'
import type { Intersection } from 'three'

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
    let active = $state(false)
    let enabled = $state(options?.enabled ?? true)
    let hovered = $state<Intersection>()

    controlsCounter += enabled ? 1 : -1

    const ctx: HandContext = {
      hand: handedness,
      active: {
        get current() {
          return active
        },
        set current(value) {
          active = value
        }
      },
      enabled: {
        get current() {
          return enabled
        },
        set current(value) {
          enabled = value
        }
      },
      hovered: {
        get current() {
          return hovered
        },
        set current(value) {
          hovered = value
        }
      }
    }

    $effect.pre(() => {
      controlsCounter += enabled ? 1 : -1
      teleportState[handedness].enabled = controlsCounter > 0
    })

    $effect.pre(() => {
      teleportState[handedness].hovering = active
    })

    setHandContext(handedness, ctx)

    setupTeleportControls(context, ctx, options?.fixedStep)
  }

  const handContext = getHandContext(handedness)

  return {
    enabled: handContext.enabled,
    hovered: handContext.hovered,
    active: handContext.active
  }
}

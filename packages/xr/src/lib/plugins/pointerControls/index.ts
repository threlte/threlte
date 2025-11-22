import { Raycaster, Vector3 } from 'three'
import { currentWritable, watch } from '@threlte/core'
import { defaultComputeFunction, type ComputeFunction } from './compute.js'
import { injectPointerControlsPlugin } from './plugin.svelte.js'
import { setupPointerControls } from './setup.svelte.js'
import {
  getControlsContext,
  getHandContext,
  setControlsContext,
  setHandContext,
  setInternalContext
} from './context.js'
import type { FilterFunction, HandContext } from './types.js'
import { pointerState } from '../../internal/state.svelte.js'

let controlsCounter = 0

export type PointerControlsOptions = {
  enabled?: boolean
  /**
   * The compute function is responsible for updating the state of the pointerControls plugin.
   * It needs to set up the raycaster and the pointer vector. If no compute function is provided,
   * the plugin will use the default compute function.
   */
  compute?: ComputeFunction
  /**
   * The filter function is responsible for filtering and sorting the
   * intersections. By default, the intersections are sorted by distance. If no
   * filter function is provided, the plugin will use the default filter function.
   */
  filter?: FilterFunction

  /**
   * Sets the interval at which raycasting occurs.
   *
   * @default 1 / 40
   */
  fixedStep?: number
}

export const pointerControls = (handedness: 'left' | 'right', options?: PointerControlsOptions) => {
  if (getControlsContext() === undefined) {
    injectPointerControlsPlugin()

    setInternalContext()

    setControlsContext({
      interactiveObjects: [],
      raycaster: new Raycaster(),
      compute: options?.compute ?? defaultComputeFunction,
      filter: options?.filter
    })
  }

  const context = getControlsContext()

  if (getHandContext(handedness) === undefined) {
    const enabled = options?.enabled ?? true

    const ctx: HandContext = {
      hand: handedness,
      enabled: currentWritable(enabled),
      pointer: currentWritable(new Vector3()),
      pointerOverTarget: currentWritable(false),
      lastEvent: undefined,
      initialClick: [0, 0, 0],
      initialHits: [],
      hovered: new Map()
    }

    setHandContext(handedness, ctx)

    setupPointerControls(context, ctx, options?.fixedStep)
  }

  const handContext = getHandContext(handedness)

  watch(handContext.enabled, (enabled) => {
    controlsCounter += enabled ? 1 : -1
    pointerState[handedness].enabled = controlsCounter > 0
  })

  watch(handContext.pointerOverTarget, (hovering) => {
    pointerState[handedness].hovering = hovering
  })

  return {
    enabled: handContext.enabled,
    hovered: handContext.hovered
  }
}

import { Raycaster } from 'three'
import { defaultComputeFunction, type ComputeFunction } from './compute.js'
import { injectPointerControlsPlugin } from './plugin.svelte.js'
import { setupPointerControls } from './setup.svelte.js'
import {
  getControlsContext,
  getHandContext,
  setControlsContext,
  setHandContext,
  setInternalContext
} from './context.svelte.js'
import type { FilterFunction } from './types.js'

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
    const handContext = setHandContext(handedness, () => options?.enabled ?? true)

    setupPointerControls(context, handContext, options?.fixedStep)
  }

  const handContext = getHandContext(handedness)

  return {
    enabled: handContext.enabled,
    hovered: handContext.hovered
  }
}

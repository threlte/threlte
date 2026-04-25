import { Raycaster, Vector3 } from 'three'
import { currentWritable, observe, type CurrentWritable } from '@threlte/core'
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
import type { FilterFunction, HandContext, IntersectionEvent, PointerSourceType } from './types.js'
import { pointerIntersection, pointerState } from '../../internal/state.svelte.js'

const aggregateStates = new Map<
  'left' | 'right',
  {
    enabled: CurrentWritable<boolean>
    hovered: Map<string, IntersectionEvent>
  }
>()

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
    setControlsContext({ interactiveObjects: [] })
  }

  const context = getControlsContext()
  const aggregateState =
    aggregateStates.get(handedness) ??
    (() => {
      const state = {
        enabled: currentWritable(options?.enabled ?? true),
        hovered: new Map<string, IntersectionEvent>()
      }
      aggregateStates.set(handedness, state)
      return state
    })()
  const { enabled, hovered } = aggregateState

  let controllerContext = getHandContext(handedness, 'controller')
  let handContext = getHandContext(handedness, 'hand')

  const syncSharedState = () => {
    hovered.clear()

    for (const [id, event] of controllerContext.hovered) {
      hovered.set(`controller:${id}`, event)
    }

    for (const [id, event] of handContext.hovered) {
      hovered.set(`hand:${id}`, event)
    }

    pointerState[handedness].hovering =
      controllerContext.pointerOverTarget.current || handContext.pointerOverTarget.current
    pointerIntersection[handedness] =
      controllerContext.currentIntersection ?? handContext.currentIntersection
  }

  const createContext = (sourceType: PointerSourceType): HandContext => ({
    hand: handedness,
    sourceType,
    enabled,
    pointer: currentWritable(new Vector3()),
    pointerOverTarget: currentWritable(false),
    lastEvent: undefined,
    initialClick: [0, 0, 0],
    initialHits: [],
    hovered: new Map(),
    currentIntersection: undefined,
    raycaster: new Raycaster(),
    syncSharedState,
    compute: options?.compute ?? defaultComputeFunction,
    filter: options?.filter
  })

  const setupContexts: HandContext[] = []

  if (controllerContext === undefined) {
    controllerContext = createContext('controller')
    setHandContext(handedness, 'controller', controllerContext)
    setupContexts.push(controllerContext)
  }

  if (handContext === undefined) {
    handContext = createContext('hand')
    setHandContext(handedness, 'hand', handContext)
    setupContexts.push(handContext)
  }

  for (const setupContext of setupContexts) {
    setupPointerControls(context, setupContext, options?.fixedStep)
  }

  observe.pre(
    () => [enabled],
    ([nextEnabled]) => {
      pointerState[handedness].enabled = nextEnabled
    }
  )

  syncSharedState()

  return {
    enabled,
    hovered
  }
}

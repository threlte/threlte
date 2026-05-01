import { Vector3 } from 'three'
import { currentWritable } from '@threlte/core'
import { defaultComputeFunction, type ComputeFunction } from './compute.js'
import { injectTouchControlsPlugin } from './plugin.svelte.js'
import { setupTouchControls } from './setup.svelte.js'
import {
  getControlsContext,
  getHandContext,
  setControlsContext,
  setHandContext,
  setInternalContext
} from './context.js'
import type { FilterFunction, HandContext } from './types.js'
import type { HandJoints } from '../../lib/handJoints.js'

export type TouchControlsOptions = {
  enabled?: boolean
  /**
   * Which hand joint to track. Defaults to the index fingertip.
   * @default 'index-finger-tip'
   */
  joint?: HandJoints
  /**
   * Distance at which an object starts receiving hover events.
   * @default 0.03
   */
  hoverRadius?: number
  /**
   * Distance below which a hover transitions to `pointerdown` (and crossing back up fires
   * `pointerup` + `click`).
   * @default 0.01
   */
  downRadius?: number
  compute?: ComputeFunction
  filter?: FilterFunction
  /**
   * Interval at which joint positions are polled and intersections are recomputed.
   * @default 1 / 40
   */
  fixedStep?: number
}

export const touchControls = (handedness: 'left' | 'right', options?: TouchControlsOptions) => {
  if (getControlsContext() === undefined) {
    injectTouchControlsPlugin()
    setInternalContext()
    setControlsContext({ interactiveObjects: [] })
  }

  const context = getControlsContext()

  if (getHandContext(handedness) === undefined) {
    const ctx: HandContext = {
      hand: handedness,
      enabled: currentWritable(options?.enabled ?? true),
      pointer: currentWritable(new Vector3()),
      pointerOverTarget: currentWritable(false),
      origin: new Vector3(),
      originValid: false,
      lastEvent: undefined,
      initialClick: [0, 0, 0],
      initialHits: [],
      hovered: new Map(),
      down: false,
      joint: options?.joint ?? 'index-finger-tip',
      hoverRadius: options?.hoverRadius ?? 0.03,
      downRadius: options?.downRadius ?? 0.01,
      compute: options?.compute ?? defaultComputeFunction,
      filter: options?.filter
    }

    setHandContext(handedness, ctx)

    setupTouchControls(context, ctx, options?.fixedStep)
  }

  const handContext = getHandContext(handedness)

  return {
    enabled: handContext.enabled,
    hovered: handContext.hovered
  }
}

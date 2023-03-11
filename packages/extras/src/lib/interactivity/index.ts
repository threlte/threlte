import { currentWritable, useThrelte } from '@threlte/core'
import { setContext } from 'svelte'
import { Raycaster, Vector2 } from 'three'
import { getDefaultComputeFunction } from './defaults'
import { injectInteractivityPlugin } from './plugin'
import { setupInteractivity } from './setupInteractivity'
import type { InteractivityOptions, State } from './types'

const interactivity = (options?: InteractivityOptions) => {
  const state: State = {
    enabled: currentWritable(options?.enabled ?? true),
    pointer: currentWritable(new Vector2()),
    pointerOverTarget: currentWritable(false),
    lastEvent: undefined,
    raycaster: new Raycaster(),
    initialClick: [0, 0],
    initialHits: [],
    hovered: new Map(),
    interactiveObjects: [],
    target: currentWritable(options?.target ?? useThrelte().renderer?.domElement),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    compute: () => {}, // will be replaced by the default or the user-provided function
    filter: options?.filter
  }

  state.compute = options?.compute ?? getDefaultComputeFunction(state)

  setContext<State>('threlte-interactivity-context', state)

  injectInteractivityPlugin(state)
  setupInteractivity(state)

  return state
}

// exports
export { useInteractivity } from './hook'
export type { DomEvent, Intersection, IntersectionEvent, ThrelteEvents as EventMap } from './types'
export { interactivity }

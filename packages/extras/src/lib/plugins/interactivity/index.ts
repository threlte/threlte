import { useThrelte } from '@threlte/core'
import { onDestroy, setContext } from 'svelte'
import { Raycaster, Vector2 } from 'three'
import { getDefaultComputeFunction } from './defaults'
import { injectInteractivityPlugin } from './plugin'
import { setupInteractivity } from './setupInteractivity'
import type { ComputeFunction, InteractivityOptions, State } from './types'

const interactivity = (options?: InteractivityOptions) => {
  const state: State = {
    enabled: options?.enabled ?? true,
    pointer: new Vector2(),
    lastEvent: undefined,
    raycaster: new Raycaster(),
    initialClick: [0, 0],
    lastPointerDownHits: [],
    hovered: new Map(),
    interactiveObjects: [],
    target: undefined,
    compute: options?.compute ?? getDefaultComputeFunction()
  }

  setContext<State>('threlte-interactivity-context', state)

  injectInteractivityPlugin(state)

  const { connect, disconnect } = setupInteractivity(state)

  return {
    connect,
    disconnect
  }
}

// exports
export { useInteractivity } from './hook'
export type { DomEvent, ThrelteEvents as EventMap, Intersection, IntersectionEvent } from './types'
export { interactivity }

import { setContext } from 'svelte'
import { Raycaster, Vector2 } from 'three'
import { injectInteractivityPlugin } from './plugin'
import { setupInteractivity } from './setupInteractivity'
import type { InteractivityOptions, State } from './types'

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
    compute: options?.compute
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
export type { DomEvent, EventMap, Intersection, IntersectionEvent } from './types'
export { interactivity }

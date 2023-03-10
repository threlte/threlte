import type { Object3D } from 'three'
import { setupInteractivity } from './setupInteractivity'
import { injectInteractivityPlugin } from './plugin'

export const interactivity = () => {
  const interactiveObjects = new Set<Object3D>()

  injectInteractivityPlugin(interactiveObjects)
  setupInteractivity(interactiveObjects)
}

export type { EventMap, Intersection, IntersectionEvent, DomEvent } from './types'

import { injectInteractivityPlugin } from './plugin'
import { setupInteractivity } from './setupInteractivity'
import { setInteractivityContext, type InteractivityOptions } from './context'

const interactivity = (options?: InteractivityOptions) => {
  const context = setInteractivityContext(options)

  injectInteractivityPlugin()
  setupInteractivity(context)

  return context
}

// exports
export { useInteractivity } from './hook'
export type { DomEvent, Intersection, IntersectionEvent, ThrelteEvents as EventMap } from './types'
export { interactivity }

import { injectInteractivityPlugin } from './plugin.svelte.js'
import { setupInteractivity } from './setupInteractivity.js'
import { setInteractivityContext, type InteractivityOptions } from './context.js'

const interactivity = (options?: InteractivityOptions) => {
  const context = setInteractivityContext(options)

  injectInteractivityPlugin()
  setupInteractivity(context)

  return context
}

// exports
export { useInteractivity } from './context.js'
export type {
  DomEvent,
  Intersection,
  IntersectionEvent,
  ThrelteEvents as EventMap,
  InteractivityProps
} from './types.js'
export { interactivity }

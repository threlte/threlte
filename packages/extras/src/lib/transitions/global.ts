import type { ThrelteTransition } from './types'

export const global = (transition: ThrelteTransition<unknown>) => {
  return Object.assign(transition, {
    global: true
  })
}

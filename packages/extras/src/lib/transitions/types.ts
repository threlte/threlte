import type { TransitionConfig } from 'svelte/transition'

export type ThrelteTransitionInput<Ref> = [
  ref: Ref,
  options: {
    direction: 'in' | 'out' | 'both'
  }
]

export type ThrelteTransitionConfig = Omit<TransitionConfig, 'css'>

export type ThrelteTransition<Ref> = (
  ...args: ThrelteTransitionInput<Ref>
) => ThrelteTransitionConfig | undefined

export type ThrelteGlobalTransition<Ref> = ThrelteTransition<Ref> & {
  global: true
}

export interface TransitionProps {
  in?: ThrelteTransition<unknown>
  out?: ThrelteTransition<unknown>
  transition?: ThrelteTransition<unknown>
  onintrostart?: () => void
  onoutrostart?: () => void
  onintroend?: () => void
  onoutroend?: () => void
}

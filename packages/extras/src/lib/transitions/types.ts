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
) => ThrelteTransitionConfig

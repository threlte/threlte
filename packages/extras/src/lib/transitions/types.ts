import type { TransitionConfig } from 'svelte/transition'
import type { Simplify } from 'type-fest'

export type ThrelteTransitionInput<Ref> = [
  ref: Ref,
  options: {
    direction: 'in' | 'out' | 'both'
  }
]

export type ThrelteTransitionConfig = Simplify<Omit<TransitionConfig, 'css'>>

export type ThrelteTransition<Ref> = (
  ...args: ThrelteTransitionInput<Ref>
) => ThrelteTransitionConfig

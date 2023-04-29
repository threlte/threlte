import type { ThrelteContext } from '@threlte/core'
import type { TransitionConfig } from 'svelte/transition'
import type { Simplify } from 'type-fest'

export type ThrelteTransitionInput<Ref> = [
  params: {
    ref: Ref
    direction: 'in' | 'out' | 'both'
  },
  ctx: ThrelteContext
]

export type ThrelteTransitionConfig = Simplify<Omit<TransitionConfig, 'css'>>

export type ThrelteTransition<Ref> = (
  ...args: ThrelteTransitionInput<Ref>
) => ThrelteTransitionConfig

import type { ThrelteContext } from '@threlte/core'
import type { TransitionConfig } from 'svelte/transition'
import type { Simplify } from 'type-fest'

export type Transition<Ref> = (
  params: {
    ref: Ref
    direction: 'in' | 'out' | 'both'
  },
  ctx: ThrelteContext
) => Simplify<Omit<TransitionConfig, 'css'>>

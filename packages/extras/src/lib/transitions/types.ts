import type { ThrelteContext } from '@threlte/core'
import type { TransitionConfig } from 'svelte/transition'
import type { Simplify } from 'type-fest'

export type Transition<Ref> = (
  ref: Ref,
  ctx: ThrelteContext
) => Simplify<Omit<TransitionConfig, 'css'>>

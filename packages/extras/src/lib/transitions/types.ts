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
  /** The transition played when the object is added. */
  in?: ThrelteTransition<unknown>
  /** The transition played when the object is removed. */
  out?: ThrelteTransition<unknown>
  /** The transition played both when the object is added and removed. */
  transition?: ThrelteTransition<unknown>
  /** Called when the intro transition starts. */
  onintrostart?: () => void
  /** Called when the outro transition starts. */
  onoutrostart?: () => void
  /** Called when the intro transition ends. */
  onintroend?: () => void
  /** Called when the outro transition ends. */
  onoutroend?: () => void
}

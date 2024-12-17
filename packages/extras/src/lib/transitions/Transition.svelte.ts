/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TransitionConfig as SvelteTransitionConfig } from 'svelte/transition'
import { transition } from './internals'

const TRANSITION_IN = 1
const TRANSITION_OUT = 1 << 1
const TRANSITION_GLOBAL = 1 << 2

type TransitionConfig = Omit<SvelteTransitionConfig, 'css'>

type SvelteTransition = (
  node: HTMLElement,
  params: unknown,
  options: { direction: 'in' | 'out' | 'both' }
) => TransitionConfig

type TransitionFn = (options: { direction: 'in' | 'out' | 'both' }) => TransitionConfig

export type TransitionOptions = {
  in?: boolean
  out?: boolean
  global?: boolean
  config: TransitionFn
  onintrostart?: () => void
  onoutrostart?: () => void
  onintroend?: () => void
  onoutroend?: () => void
}

export class Transition {
  #patchedTransition(): SvelteTransition {
    return (
      _node: HTMLElement,
      _params: unknown,
      options: { direction: 'in' | 'out' | 'both' }
    ) => {
      return this.options.config(options)
    }
  }

  constructor(private readonly options: TransitionOptions) {
    if (typeof window === 'undefined') return
    if (!options.in && !options.out) return

    let flags = options.global ? TRANSITION_GLOBAL : 0
    if (options.in) flags |= TRANSITION_IN
    if (options.out) flags |= TRANSITION_OUT

    // fake HTML Element
    const el = document.createElement('div')

    el.dispatchEvent = (e: Event) => {
      if (e.type === 'introstart') {
        this.options.onintrostart?.()
      } else if (e.type === 'outrostart') {
        this.options.onoutrostart?.()
      } else if (e.type === 'introend') {
        this.options.onintroend?.()
      } else if (e.type === 'outroend') {
        this.options.onoutroend?.()
      }
      return true
    }

    transition(flags, el, () => this.#patchedTransition())
  }
}

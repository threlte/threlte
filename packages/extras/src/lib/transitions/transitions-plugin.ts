import { injectPlugin, useThrelte } from '@threlte/core'
import { get_current_component, onDestroy, onMount } from 'svelte/internal'

import { create_out_transition } from 'svelte/internal'
import type { Transition } from './types'

const prepend = (target: (...args: any[]) => any, prepend: (...args: any[]) => any) => {
  return (...args: any[]) => {
    prepend(...args)
    target(...args)
  }
}

export const transitions = () => {
  injectPlugin<{
    in?: Transition<any>
    out?: Transition<any>
    transition?: Transition<any>
  }>('transitions', ({ ref, props }) => {
    if (!props.in && !props.out && !props.transition) return

    const ctx = useThrelte()

    let currentRef = ref

    const el = document.createElement('div')
    const comp = get_current_component()

    if (props.out) {
      let outro: ReturnType<typeof create_out_transition>
      onMount(() => {
        // Set up outro
        comp.$$.fragment.o = prepend(comp.$$.fragment.o, () => {
          const t = props.out?.(currentRef, ctx) as any
          if (!t) return
          const fn = (_node: Element) => {
            return {
              ...t
            }
          }
          outro = create_out_transition(el, fn, {})
        })
        comp.$$.fragment.i = prepend(comp.$$.fragment.i, () => {
          outro?.end(1)
        })
        comp.$$.fragment.d = prepend(comp.$$.fragment.d, (...args: any) => {
          const detaching = args[0]
          if (detaching && outro) outro.end(0)
        })
      })
    }

    onDestroy(() => {
      el.remove()
    })

    return {
      onRefChange(ref) {
        currentRef = ref
      }
    }
  })
}

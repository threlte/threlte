import { injectPlugin, useThrelte } from '@threlte/core'
import {
  add_render_callback,
  create_bidirectional_transition,
  create_in_transition,
  get_current_component,
  onDestroy,
  onMount
} from 'svelte/internal'

import { create_out_transition } from 'svelte/internal'
import type { TransitionConfig } from 'svelte/transition'
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

    const convertTransition = (
      transition: Transition<any>
    ): ((...args: any[]) => TransitionConfig) => {
      return (_node: Element, _params: any, options: { direction: 'in' | 'out' | 'both' }) => {
        return transition(
          {
            ref: currentRef,
            direction: options.direction
          },
          ctx
        )
      }
    }

    if (props.transition) {
      let transition: ReturnType<typeof create_bidirectional_transition>
      onMount(() => {
        add_render_callback(() => {
          if (!transition) {
            if (!props.transition) return
            transition = create_bidirectional_transition(
              el,
              convertTransition(props.transition),
              {},
              true
            )
          }
          transition.run(1)
        })
        comp.$$.fragment.i = prepend(comp.$$.fragment.i, () => {
          add_render_callback(() => {
            if (!transition) {
              if (!props.transition) return
              transition = create_bidirectional_transition(
                el,
                convertTransition(props.transition),
                {},
                true
              )
            }
            transition.run(1)
          })
        })
        comp.$$.fragment.o = prepend(comp.$$.fragment.c, () => {
          if (!transition) {
            if (!props.transition) return
            transition = create_bidirectional_transition(
              el,
              convertTransition(props.transition),
              {},
              false
            )
          }
          transition.run(0)
        })
        comp.$$.fragment.d = prepend(comp.$$.fragment.d, (...args: any) => {
          const detaching = args[0]
          if (detaching && transition) transition.end()
        })
      })
    } else if (props.in) {
      let intro: ReturnType<typeof create_in_transition>
      onMount(() => {
        add_render_callback(() => {
          if (!props.in) return
          intro = create_in_transition(el, convertTransition(props.in), {})
          intro.start()
        })

        comp.$$.fragment.o = prepend(comp.$$.fragment.c, () => {
          intro?.end()
        })
      })
    } else if (props.out) {
      let outro: ReturnType<typeof create_out_transition>
      onMount(() => {
        // Set up outro
        comp.$$.fragment.o = prepend(comp.$$.fragment.o, () => {
          if (!props.out) return
          outro = create_out_transition(el, convertTransition(props.out), {})
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

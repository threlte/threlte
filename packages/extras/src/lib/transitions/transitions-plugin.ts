import { createRawEventDispatcher, injectPlugin, useThrelte } from '@threlte/core'
import {
  add_render_callback,
  create_bidirectional_transition,
  create_in_transition,
  get_current_component,
  onMount,
  create_out_transition
} from 'svelte/internal'
import type { TransitionConfig } from 'svelte/transition'
import type { ThrelteTransition } from './types'

const fragmentFunctions = {
  create: 'c',
  claim: 'l',
  hydrate: 'h',
  mount: 'm',
  update: 'p',
  measure: 'r',
  fix: 'f',
  animate: 'a',
  intro: 'i',
  outro: 'o',
  destroy: 'd'
} as const

type FragmentFunction = keyof typeof fragmentFunctions

const appendToFragmentFunction = (
  component: any,
  fragmentFn: FragmentFunction,
  append: (...args: any[]) => any
) => {
  const fragment = component.$$.fragment
  const fragmentFnShorthand = fragmentFunctions[fragmentFn]
  const original = fragment[fragmentFnShorthand]
  fragment[fragmentFnShorthand] = (...args: any[]) => {
    append(...args)
    original(...args)
  }
}

/**
 * # EXPERIMENTAL
 *
 * **This plugin is experimental and may change or be removed.**
 *
 * ---
 *
 * The plugin `transitions` allows you to use transitions with Threlte.
 * The syntax is slightly different from Svelte's transitions, but it's very similar.
 *
 * ## Usage
 *
 * ```svelte
 * <script>
 *   import { transitions, createTransition } from '@threlte/extras'
 *
 *   transitions()
 *
 *   export let show = false
 *
 *   const fade = createTransition<Material>((ref) => {
 *     if (!ref.transparent) ref.transparent = true
 *     return {
 *       tick(t) {
 *         ref.opacity = t
 *       },
 *       easing: cubicOut,
 *       duration: 400
 *     }
 *   })
 * </script>
 *
 * {#if showCube}
 *   <T.Mesh>
 *     <T.BoxGeometry />
 *     <T.MeshStandardMaterial transition={fade} />
 *   </T.Mesh>
 * {/if}
 * ```
 */
export const transitions = () => {
  injectPlugin<{
    in?: ThrelteTransition<any>
    out?: ThrelteTransition<any>
    transition?: ThrelteTransition<any>
  }>('transitions', ({ ref, props }) => {
    if (!props.in && !props.out && !props.transition) return

    const { invalidate } = useThrelte()
    const dispatch = createRawEventDispatcher()

    let currentRef = ref

    // fake HTML Element
    const el = {
      style: {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      dispatchEvent: (...args: any) => {
        const eventType = args[0].type
        dispatch(eventType, ...args)
      }
    } as any

    const comp = get_current_component()

    const convertTransition = (
      transition: ThrelteTransition<any>
    ): ((...args: any[]) => TransitionConfig) => {
      return (_node: Element, _params: any, options: { direction: 'in' | 'out' | 'both' }) => {
        const t = transition(currentRef, {
          direction: options.direction
        })
        return {
          ...t,
          tick(...args) {
            invalidate()
            t?.tick?.(...args)
          }
        }
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
        appendToFragmentFunction(comp, 'intro', () => {
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
        appendToFragmentFunction(comp, 'outro', () => {
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
        appendToFragmentFunction(comp, 'destroy', (...args: any) => {
          const detaching = args[0]
          if (detaching && transition) transition.end()
        })
      })
    } else {
      if (props.in) {
        let intro: ReturnType<typeof create_in_transition>
        onMount(() => {
          add_render_callback(() => {
            if (!props.in) return
            intro = create_in_transition(el, convertTransition(props.in), {})
            intro.start()
          })

          appendToFragmentFunction(comp, 'outro', () => {
            intro?.end()
          })
        })
      }
      if (props.out) {
        let outro: ReturnType<typeof create_out_transition>
        onMount(() => {
          appendToFragmentFunction(comp, 'outro', () => {
            if (!props.out) return
            outro = create_out_transition(el, convertTransition(props.out), {})
          })
          appendToFragmentFunction(comp, 'intro', () => {
            outro?.end(1)
          })
          appendToFragmentFunction(comp, 'destroy', (...args: any) => {
            const detaching = args[0]
            if (detaching && outro) outro.end(0)
          })
        })
      }
    }

    return {
      onRefChange(ref) {
        currentRef = ref
      },
      pluginProps: ['in', 'out', 'transition']
    }
  })
}

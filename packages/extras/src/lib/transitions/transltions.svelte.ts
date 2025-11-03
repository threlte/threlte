import { injectPlugin, useThrelte } from '@threlte/core'
import type { TransitionConfig } from 'svelte/transition'
import { transition } from './internals.js'
import type { ThrelteGlobalTransition, ThrelteTransition } from './types.js'

const el = typeof window !== 'undefined' ? document.createElement('div') : undefined

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
 *   let { show } = $props()
 *
 *   const fade = createTransition((ref) => {
 *     if (!isInstanceOf(ref, 'Material')) return
 *     if (!ref.transparent) {
 *       ref.transparent = true
 *       ref.needsUpdate = true
 *     }
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
    in?: ThrelteTransition<unknown> | ThrelteGlobalTransition<unknown>
    out?: ThrelteTransition<unknown> | ThrelteGlobalTransition<unknown>
    transition?: ThrelteTransition<unknown> | ThrelteGlobalTransition<unknown>
    onintrostart?: () => void
    onoutrostart?: () => void
    onintroend?: () => void
    onoutroend?: () => void
  }>('transitions', (args) => {
    // Early return in non-browser environments
    if (!el) return

    // No transitions provided, nothing to do
    if (!args.props.in && !args.props.out && !args.props.transition) return

    const { invalidate } = useThrelte()

    // Reroute events to the props
    el.dispatchEvent = (e: Event) => {
      if (e.type === 'introstart') {
        args.props.onintrostart?.()
      } else if (e.type === 'outrostart') {
        args.props.onoutrostart?.()
      } else if (e.type === 'introend') {
        args.props.onintroend?.()
      } else if (e.type === 'outroend') {
        args.props.onoutroend?.()
      }
      return true
    }

    const convertTransition = (
      transitionC: ThrelteTransition<unknown>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): ((...args: any[]) => TransitionConfig) => {
      return (_node: Element, _params: unknown, options: { direction: 'in' | 'out' | 'both' }) => {
        const t = transitionC(args.ref, {
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

    const props = ['in', 'out', 'transition'] as const

    const globalFlags: Record<(typeof props)[number], number> = {
      in: 5,
      out: 6,
      transition: 7
    }

    const localFlags: Record<(typeof props)[number], number> = {
      in: 1,
      out: 2,
      transition: 3
    }

    for (const prop of props) {
      const t = args.props[prop]
      if (t) {
        const global = 'global' in t
        const flag = global ? globalFlags[prop] : localFlags[prop]
        transition(flag, el, () => convertTransition(t))
      }
    }

    return {
      pluginProps: [
        'in',
        'out',
        'transition',
        'onintrostart',
        'onoutrostart',
        'onintroend',
        'onoutroend'
      ]
    }
  })
}

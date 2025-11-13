import type { ThrelteTransition } from './types.js'

/**
 * # EXPERIMENTAL
 *
 * **This plugin is experimental and may change or be removed.**
 *
 * Marks a transition as global.
 *
 * @example
 *
 * ```svelte
 * <script>
 *   import { global } from '@threlte/extras'
 *   import { fade } from './transitions'
 * </script>
 *
 * <T.Mesh transition={global(fade)} />
 * ```
 */
export const global = (transition: ThrelteTransition<unknown>) => {
  return Object.assign(transition, {
    global: true
  })
}

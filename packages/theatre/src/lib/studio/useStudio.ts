import { studio } from '../consts.js'

/**
 * ### `useStudio`
 *
 * The hook `useStudio` works just like a regular context-based hook but
 * actually returns a store because the Theatre.js Studio can only be
 * initialized once and therefore is a singleton. This hook can therefore be
 * called anywhere in the application to access the Theatre.js Studio.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useStudio } from '@threlte/theatre'
 *
 *   const studio = useStudio()
 *   $studio?.onSelectionChange((selection) => {
 *     console.log(selection)
 *   })
 * </script>
 * ```
 */
export const useStudio = () => {
  return studio
}

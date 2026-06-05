import { fromStore } from 'svelte/store'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useControlsContext } from '../useControlsContext.js'

/**
 * ### `useOrbitControls`
 *
 * Access the `OrbitControls` instance created by the `<OrbitControls>`
 * component mounted within the current `<Canvas>`. Useful for reading or
 * mutating the controls (`target`, `enabled`, `update`, …) from sibling or
 * parent components without a `bind:ref`.
 *
 * `current` is `undefined` until `<OrbitControls>` has mounted, and again
 * after it unmounts, so reads are always safe.
 *
 * ```svelte
 * <script>
 *   import { useOrbitControls } from '@threlte/extras'
 *
 *   const controls = useOrbitControls()
 *
 *   const reset = () => {
 *     controls.current?.reset()
 *   }
 * </script>
 * ```
 */
export const useOrbitControls = (): { readonly current: OrbitControls | undefined } => {
  const { orbitControls } = useControlsContext()
  const controls = fromStore(orbitControls)
  return {
    get current() {
      return controls.current
    }
  }
}

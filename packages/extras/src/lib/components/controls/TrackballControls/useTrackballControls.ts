import { fromStore } from 'svelte/store'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { useControlsContext } from '../useControlsContext.js'

/**
 * ### `useTrackballControls`
 *
 * Access the `TrackballControls` instance created by the `<TrackballControls>`
 * component mounted within the current `<Canvas>`. Useful for reading or
 * mutating the controls (`target`, `enabled`, `update`, …) from sibling or
 * parent components without a `bind:ref`.
 *
 * `current` is `undefined` until `<TrackballControls>` has mounted, and again
 * after it unmounts, so reads are always safe.
 *
 * ```svelte
 * <script>
 *   import { useTrackballControls } from '@threlte/extras'
 *
 *   const controls = useTrackballControls()
 *
 *   const reset = () => {
 *     controls.current?.reset()
 *   }
 * </script>
 * ```
 */
export const useTrackballControls = (): { readonly current: TrackballControls | undefined } => {
  const { trackballControls } = useControlsContext()
  const controls = fromStore(trackballControls)
  return {
    get current() {
      return controls.current
    }
  }
}

import { fromStore } from 'svelte/store'
import type { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import { useControlsContext } from '../useControlsContext.js'

/**
 * ### `useTransformControls`
 *
 * Access the `TransformControls` instance created by the `<TransformControls>`
 * component mounted within the current `<Canvas>`. Useful for reading or
 * mutating the controls (`setMode`, `setSpace`, `enabled`, …) from sibling or
 * parent components without a `bind:controls`.
 *
 * `current` is `undefined` until `<TransformControls>` has mounted, and again
 * after it unmounts, so reads are always safe.
 *
 * ```svelte
 * <script>
 *   import { useTransformControls } from '@threlte/extras'
 *
 *   const controls = useTransformControls()
 *
 *   const rotate = () => {
 *     controls.current?.setMode('rotate')
 *   }
 * </script>
 * ```
 */
export const useTransformControls = (): { readonly current: TransformControls | undefined } => {
  const { transformControls } = useControlsContext()
  const controls = fromStore(transformControls)
  return {
    get current() {
      return controls.current
    }
  }
}

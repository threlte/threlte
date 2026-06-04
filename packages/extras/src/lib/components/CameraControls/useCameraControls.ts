import type CameraControls from 'camera-controls'
import { fromStore } from 'svelte/store'
import { useControlsContext } from '../controls/useControlsContext.js'

/**
 * ### `useCameraControls`
 *
 * Access the `CameraControls` instance created by the `<CameraControls>`
 * component mounted within the current `<Canvas>`. Useful for imperatively
 * driving the camera (`setLookAt`, `dolly`, `rotate`, …) from sibling or
 * parent components without a `bind:ref`.
 *
 * `current` is `undefined` until `<CameraControls>` has mounted, and again
 * after it unmounts, so reads are always safe.
 *
 * ```svelte
 * <script>
 *   import { useCameraControls } from '@threlte/extras'
 *
 *   const controls = useCameraControls()
 *
 *   const frameScene = () => {
 *     controls.current?.setLookAt(5, 5, 5, 0, 0, 0, true)
 *   }
 * </script>
 * ```
 */
export const useCameraControls = (): { readonly current: CameraControls | undefined } => {
  const { cameraControls } = useControlsContext()
  const controls = fromStore(cameraControls)
  return {
    get current() {
      return controls.current
    }
  }
}

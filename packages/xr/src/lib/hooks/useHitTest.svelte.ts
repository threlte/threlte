import { Matrix4 } from 'three'
import { useThrelte, useTask } from '@threlte/core'
import { controllers } from './useController.svelte.js'
import { isPresenting, session } from '../internal/state.svelte.js'

export type HitTestCallback = (hitMatrix: Matrix4, hit: XRHitTestResult | undefined) => void

export type UseHitTestOptions = {
  /**
   * The ray source when performing hit testing.
   *
   * @default 'viewer'
   */
  source?: 'viewer' | 'leftInput' | 'rightInput'
}

/**
 * Use this hook to perform a hit test per frame in an AR environment.
 *
 * ```ts
 * useHitTest((hitMatrix, hit) => {
 *   mesh.matrix.copy(hitMatrix)
 * }, {
 *   source: 'viewer' | 'leftInput' | 'rightInput' // Default 'viewer'
 * })
 * ```
 */
export const useHitTest = (
  hitTestCallback: HitTestCallback,
  options: UseHitTestOptions = {}
): void => {
  const source = options.source ?? 'viewer'
  const { xr } = useThrelte().renderer
  const hitMatrix = new Matrix4()

  let hitTestSource = $state.raw<XRHitTestSource>()

  const getHitTestSource = async (space?: XRSpace) => {
    if (space === undefined) {
      return
    }

    hitTestSource = await session.current?.requestHitTestSource?.({ space })
  }

  if (source === 'viewer') {
    $effect.pre(() => {
      session.current?.requestReferenceSpace('viewer').then((space) => {
        getHitTestSource(space)
      })
    })
  } else {
    const controller = $derived(controllers[source === 'leftInput' ? 'left' : 'right'])
    $effect.pre(() => {
      getHitTestSource(controller?.inputSource.targetRaySpace)
    })
  }

  useTask(
    () => {
      const referenceSpace = xr.getReferenceSpace()

      if (referenceSpace === null || hitTestSource === undefined) {
        return hitTestCallback(hitMatrix, undefined)
      }

      const [hit] = xr.getFrame().getHitTestResults(hitTestSource)
      const pose = hit?.getPose(referenceSpace)

      if (pose === undefined) {
        return hitTestCallback(hitMatrix, undefined)
      }

      hitMatrix.fromArray(pose.transform.matrix)
      hitTestCallback(hitMatrix, hit)
    },
    { running: () => isPresenting.current && hitTestSource !== undefined }
  )

  $effect.pre(() => {
    if (hitTestSource === undefined) {
      // Execute callback one last time to inform consumers of no hits.
      hitTestCallback(hitMatrix, undefined)
    }
  })
}

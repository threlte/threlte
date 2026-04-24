import { Matrix4 } from 'three'
import { useThrelte, useTask } from '@threlte/core'
import { controllers } from './useController.svelte.js'
import { xrOrigin } from './useXROrigin.svelte.js'
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

  if (source === 'viewer') {
    $effect.pre(() => {
      const currentSession = session.current
      if (currentSession === undefined) return

      let cancelled = false
      let created: XRHitTestSource | undefined

      currentSession
        .requestReferenceSpace('viewer')
        .then((space) => currentSession.requestHitTestSource?.({ space }))
        .then((src) => {
          if (cancelled || src === undefined) {
            src?.cancel()
            return
          }
          created = src
          hitTestSource = src
        })
        .catch(console.error)

      return () => {
        cancelled = true
        created?.cancel()
        if (hitTestSource === created) hitTestSource = undefined
      }
    })
  } else {
    const controller = $derived(controllers[source === 'leftInput' ? 'left' : 'right'])
    $effect.pre(() => {
      const currentSession = session.current
      const space = controller?.inputSource.targetRaySpace
      if (currentSession === undefined || space === undefined) return

      let cancelled = false
      let created: XRHitTestSource | undefined

      currentSession
        .requestHitTestSource?.({ space })
        ?.then((src) => {
          if (cancelled || src === undefined) {
            src?.cancel()
            return
          }
          created = src
          hitTestSource = src
        })
        .catch(console.error)

      return () => {
        cancelled = true
        created?.cancel()
        if (hitTestSource === created) hitTestSource = undefined
      }
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

      const origin = xrOrigin.current
      if (origin !== undefined) {
        origin.updateWorldMatrix(true, false)
        hitMatrix.premultiply(origin.matrixWorld)
      }

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

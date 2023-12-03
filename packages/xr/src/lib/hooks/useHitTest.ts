import { Matrix4 } from 'three'
import { useThrelte, useTask, watch, currentWritable } from '@threlte/core'
import { useXR } from './useXR'
import { useController } from './useController'

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
  const xrState = useXR()
  const hitMatrix = new Matrix4()

  const hitTestSource = currentWritable<XRHitTestSource | undefined>(undefined)

  if (source === 'viewer') {
    watch(xrState.session, async (session) => {
      if (session === undefined) {
        hitTestSource.set(undefined)
        return
      }

      const space = await session.requestReferenceSpace('viewer')
      hitTestSource.set(await session.requestHitTestSource?.({ space }))
    })
  } else {
    const controller = useController(source === 'leftInput' ? 'left' : 'right')
    const hand = useController(source === 'leftInput' ? 'left' : 'right')

    watch([xrState.session, controller], async ([session, input]) => {
      if (input === undefined || session === undefined) {
        hitTestSource.set(undefined)
        return
      }

      const space = input.inputSource.targetRaySpace
      hitTestSource.set(await session.requestHitTestSource?.({ space }))
    })

    watch([xrState.session, hand], async ([session, input]) => {
      if (input === undefined || session === undefined) {
        hitTestSource.set(undefined)
        return
      }

      const space = input.inputSource.targetRaySpace
      hitTestSource.set(await session.requestHitTestSource?.({ space }))
    })
  }

  const { start, stop } = useTask(
    () => {
      const referenceSpace = xr.getReferenceSpace()

      if (referenceSpace === null || hitTestSource.current === undefined) {
        return hitTestCallback(hitMatrix, undefined)
      }

      const [hit] = xr.getFrame().getHitTestResults(hitTestSource.current)
      const pose = hit?.getPose(referenceSpace)

      if (pose === undefined) {
        return hitTestCallback(hitMatrix, undefined)
      }

      hitMatrix.fromArray(pose.transform.matrix)
      hitTestCallback(hitMatrix, hit)
    },
    { autoStart: false }
  )

  watch([xrState.isPresenting, hitTestSource], ([isPresenting, testSource]) => {
    if (!isPresenting) {
      stop()
      return
    }

    if (testSource === undefined) {
      stop()
      // Execute callback one last time to inform consumers of no hits.
      hitTestCallback(hitMatrix, undefined)
    } else {
      start()
    }
  })
}

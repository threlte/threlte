import * as THREE from 'three'
import { useThrelte, useFrame, watch, currentWritable } from '@threlte/core'
import type { HitTestCallback } from '../types'
import { useXR } from './useXR'
import { useController } from './useController'

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
 * 
 * }, {
 *  source: 'viewer' | 'leftInput' | 'rightInput'
 * })
 * ```
 */
export const useHitTest = (hitTestCallback: HitTestCallback, options: UseHitTestOptions = {}): void => {
  const source = options.source ?? 'viewer'
  const { xr } = useThrelte().renderer
  const xrState = useXR()
  const hitMatrix = new THREE.Matrix4()

  let hitTestSource = currentWritable<XRHitTestSource | undefined>(undefined)

  if (source === 'viewer') {
    watch(xrState.session, async (session) => {
      if (session === undefined) return
      const space = await session.requestReferenceSpace('viewer') 
      hitTestSource.set(await session.requestHitTestSource?.({ space }))
    })
  } else {
    const controller = useController(source === 'leftInput' ? 'left' : 'right')
    const hand = useController(source === 'leftInput' ? 'left' : 'right')

    watch([xrState.session, controller], async ([session, input]) => {
      if (input === undefined || session === undefined) return
      const space = input.inputSource.targetRaySpace
      hitTestSource.set(await session.requestHitTestSource?.({ space }))
    })
  
    watch([xrState.session, hand], async ([session, input]) => {
      if (input === undefined || session === undefined) return
      const space = input.inputSource.targetRaySpace
      hitTestSource.set(await session.requestHitTestSource?.({ space }))
    })
  }

  const { start, stop } = useFrame(
    () => {
      const referenceSpace = xr.getReferenceSpace()

      if (referenceSpace === null) return

      if (hitTestSource.current === undefined) return

      const [hit] = xr.getFrame().getHitTestResults(hitTestSource.current)

      if (hit === undefined) return

      const pose = hit.getPose(referenceSpace)

      if (pose === undefined) return

      hitMatrix.fromArray(pose.transform.matrix)
      hitTestCallback(hitMatrix, hit)
    },
    { autostart: false }
  )

  watch(hitTestSource, (testSource) => {
    if (testSource === undefined) {
      stop()
    } else {
      start()
    }
  })
}

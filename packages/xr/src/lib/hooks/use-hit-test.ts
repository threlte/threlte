import * as THREE from 'three'
import { onDestroy } from 'svelte'
import { session } from '$lib/internal/stores'
import type { HitTestCallback } from '$lib/types'
import { useThrelte, useFrame } from '@threlte/core'

/**
 * Use this hook to perform a hit test for an AR environment.
 */
export const useHitTest = (hitTestCallback: HitTestCallback): void => {
  const { xr } = useThrelte().renderer
  const hitMatrix = new THREE.Matrix4()

  let started = false
  let hitTestSource: XRHitTestSource | undefined

  const unsub = session.subscribe(async (value) => {
    if (value === undefined) {
      hitTestSource = undefined
      if (started) {
        stop()
        started = false
      }
      return
    }

    const space = await value.requestReferenceSpace('viewer')
    hitTestSource = await value.requestHitTestSource?.({ space })
    if (!started) {
      start()
      started = true
    }
  })

  const { start, stop } = useFrame(() => {
    if (hitTestSource === undefined) return

    const [hit] = xr.getFrame().getHitTestResults(hitTestSource)

    if (hit === undefined) return
    
    const referenceSpace = xr.getReferenceSpace()

    if (referenceSpace === null) return

    const pose = hit.getPose(referenceSpace)

    if (pose === undefined) return

    hitMatrix.fromArray(pose.transform.matrix)
    hitTestCallback(hitMatrix, hit)
  }, { autostart: false })

  onDestroy(() => {
    stop()
    unsub()
  })
}

import { onDestroy } from 'svelte'
import { useThrelte, currentWritable } from '@threlte/core'
import { session } from './stores'

/**
 * Provides a reference space of the world origin,
 * useful for determining offsets using XRReferenceSpace
 */
export const useBaseReferenceSpace = () => {
  const { xr } = useThrelte().renderer
  const baseReferenceSpace = currentWritable<XRReferenceSpace | null>(null)

  onDestroy(session.subscribe((value) => {
    if (value === undefined) {
      baseReferenceSpace.set(null)
      return
    }

    baseReferenceSpace.set(xr.getReferenceSpace())
  }))

  return baseReferenceSpace
}

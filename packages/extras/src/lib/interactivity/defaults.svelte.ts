import { useThrelte } from '@threlte/core'
import type { ComputeFunction } from './context.svelte.js'
import { Vector2 } from 'three'

export const getDefaultComputeFunction = (target: () => HTMLElement): ComputeFunction => {
  const current = $derived(target())
  const { camera } = useThrelte()

  // Use contentRect dimensions from ResizeObserver for consistency.
  // Initialize to 0 — the observer fires before any meaningful pointer
  // event can be processed. The compute function guards against 0 to
  // avoid NaN from division.
  let width = 0
  let height = 0

  const resizeObserver = new ResizeObserver(([entry]) => {
    width = entry.contentRect.width
    height = entry.contentRect.height
  })

  $effect.pre(() => {
    if (!current) return

    resizeObserver.observe(current)
    return () => resizeObserver.unobserve(current)
  })

  return (event, state) => {
    // Guard against zero dimensions before ResizeObserver has fired
    if (width === 0 || height === 0) return

    state.pointer.current = new Vector2(
      (event.offsetX / width) * 2 - 1,
      -(event.offsetY / height) * 2 + 1
    )

    state.raycaster.setFromCamera(state.pointer.current, camera.current)
  }
}

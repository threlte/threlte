import { useThrelte, type CurrentWritable } from '@threlte/core'
import type { ComputeFunction } from './context.js'
import { fromStore } from 'svelte/store'

export const getDefaultComputeFunction = (
  targetWritable: CurrentWritable<HTMLElement>
): ComputeFunction => {
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

  const target = fromStore(targetWritable)

  $effect.pre(() => {
    const { current } = target

    if (!current) return

    resizeObserver.observe(current)
    return () => resizeObserver.unobserve(current)
  })

  return (event, state) => {
    // Guard against zero dimensions before ResizeObserver has fired
    if (width === 0 || height === 0) return

    state.pointer.update((pointer) => {
      pointer.set((event.offsetX / width) * 2 - 1, -(event.offsetY / height) * 2 + 1)
      return pointer
    })
    state.raycaster.setFromCamera(state.pointer.current, camera.current)
  }
}

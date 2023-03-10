import { memoize, useThrelte, watch } from '@threlte/core'
import type { ComputeFunction, State } from './types'

export const getDefaultComputeFunction = (state: State): ComputeFunction => {
  const camera = memoize(useThrelte().camera)
  const pointer = memoize(state.pointer)

  let width = 0
  let height = 0

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      width = entry.contentRect.width
      height = entry.contentRect.height
    }
  })

  watch(state.target, (target) => {
    if (target) resizeObserver.observe(target)
    return () => {
      if (target) resizeObserver.unobserve(target)
    }
  })

  return (event, state) => {
    pointer.current.set((event.offsetX / width) * 2 - 1, -(event.offsetY / height) * 2 + 1)
    state.raycaster.setFromCamera(pointer.current, camera.current)
  }
}

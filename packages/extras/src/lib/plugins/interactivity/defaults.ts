import { useThrelte } from '@threlte/core'
import type { Camera } from 'three'
import { watch } from '../../lib/watch'
import type { ComputeFunction, State } from './types'

export const getDefaultComputeFunction = (state: State): ComputeFunction => {
  const { camera: cameraStore } = useThrelte()

  let camera: Camera
  watch(cameraStore, (value) => {
    camera = value
  })

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
    state.pointer.set((event.offsetX / width) * 2 - 1, -(event.offsetY / height) * 2 + 1)
    state.raycaster.setFromCamera(state.pointer, camera)
  }
}

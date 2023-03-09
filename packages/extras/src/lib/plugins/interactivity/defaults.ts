import { useThrelte } from '@threlte/core'
import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import type { ComputeFunction } from './types'

export const getDefaultComputeFunction: () => ComputeFunction = () => {
  const { camera: cameraStore, size: SizeStore } = useThrelte()

  let camera = get(cameraStore)
  onDestroy(cameraStore.subscribe((value) => (camera = value)))

  let size = get(SizeStore)
  onDestroy(SizeStore.subscribe((value) => (size = value)))

  return (event, state) => {
    state.pointer.set((event.offsetX / size.width) * 2 - 1, -(event.offsetY / size.height) * 2 + 1)
    state.raycaster.setFromCamera(state.pointer, camera)
  }
}

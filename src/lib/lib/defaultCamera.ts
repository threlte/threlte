import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import { PerspectiveCamera } from 'three'
import type { ThrelteContext } from '..'
import { getThrelteUserData } from './getThrelteUserData'

export const getDefaultCamera = (): PerspectiveCamera => {
  const defaultCamera = new PerspectiveCamera(75, 0, 0.1, 1000)
  getThrelteUserData(defaultCamera).threlteDefaultCamera = true
  defaultCamera.position.z = 5
  defaultCamera.lookAt(0, 0, 0)
  return defaultCamera
}

export const setDefaultCameraAspectOnSizeChange = (ctx: ThrelteContext): void => {
  const unsubscribe = ctx.size.subscribe((size) => {
    if (getThrelteUserData(get(ctx.camera)).threlteDefaultCamera) {
      ctx.camera.update((c) => {
        const cam = c as PerspectiveCamera
        cam.aspect = size.width / size.height
        cam.updateProjectionMatrix()
        ctx.invalidate('Default camera: aspect ratio changed')
        return cam
      })
    }
  })
  onDestroy(unsubscribe)
}

import { getContext, setContext } from 'svelte'
import { PerspectiveCamera, type Camera } from 'three'
import { useCanvas } from './canvas'
import { useScheduler } from './scheduler.svelte'
import { currentWritable, watch, type CurrentWritable } from '../../lib/storeUtils'

type CameraContext = {
  camera: CurrentWritable<Camera>
}

export const createCameraContext = (): CameraContext => {
  const { size } = useCanvas()
  const { invalidate } = useScheduler()

  // Create a default camera to use when no camera is defined by the user
  const defaultCamera = new PerspectiveCamera(75, 0, 0.1, 1000)
  defaultCamera.position.z = 5
  defaultCamera.lookAt(0, 0, 0)

  const camera = currentWritable(defaultCamera)

  watch(size, (size) => {
    if (camera.current === defaultCamera) {
      const cam = camera.current as PerspectiveCamera
      cam.aspect = size.width / size.height
      cam.updateProjectionMatrix()
      invalidate()
    }
  })

  const context: CameraContext = { camera }

  setContext<CameraContext>('threlte-camera-context', context)

  return context
}

export const useCamera = (): CameraContext => {
  const context = getContext<CameraContext>('threlte-camera-context')

  if (!context) {
    throw new Error('useCamera can only be used in a child component to <Canvas>.')
  }

  return context
}

import { getContext, setContext } from 'svelte'
import { OrthographicCamera, PerspectiveCamera } from 'three'
import { useDOM } from './dom.svelte.js'
import { useScheduler } from './scheduler.svelte.js'

export interface CameraContext {
  camera: {
    readonly current: PerspectiveCamera | OrthographicCamera
    set(value: PerspectiveCamera | OrthographicCamera): void
  }
}

export const createCameraContext = (): CameraContext => {
  const { size } = useDOM()
  const { invalidate } = useScheduler()

  // Create a default camera to use when no camera is defined by the user
  const defaultCamera = new PerspectiveCamera(75, 0, 0.1, 1000)
  defaultCamera.position.z = 5
  defaultCamera.lookAt(0, 0, 0)

  let camera = $state.raw<PerspectiveCamera | OrthographicCamera>(defaultCamera)

  // The default camera doesn't have a <T> component so needs projection matrix management
  $effect.pre(() => {
    const { width, height } = size.current
    defaultCamera.aspect = width / height
    defaultCamera.updateProjectionMatrix()
    defaultCamera.updateMatrixWorld()
    invalidate()
  })

  $effect.pre(() => {
    if (camera === undefined) {
      camera = defaultCamera
    }
  })

  const context: CameraContext = {
    camera: {
      get current() {
        return camera
      },
      set(value) {
        camera = value
      }
    }
  }

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

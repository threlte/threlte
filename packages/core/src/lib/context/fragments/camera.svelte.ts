import { getContext, setContext } from 'svelte'
import { OrthographicCamera, PerspectiveCamera, type Camera } from 'three'
import { runeToCurrentWritable, type CurrentWritable } from '../../utilities/currentWritable.js'
import { useDOM } from './dom.svelte.js'
import { useScheduler } from './scheduler.svelte.js'
import { fromStore } from 'svelte/store'
import { SvelteSet } from 'svelte/reactivity'

export interface CameraContext {
  camera: CurrentWritable<Camera>
  makeDefaultCameras: SvelteSet<Camera>
  manual: {
    current: boolean
    set(value: boolean): void
  }
}

export const createCameraContext = (): CameraContext => {
  const { size: sizeStore } = useDOM()
  const size = fromStore(sizeStore)
  const { invalidate } = useScheduler()

  const makeDefaultCameras = new SvelteSet<Camera>()

  // Create a default camera to use when no camera is defined by the user.
  // Aspect is 1 (not 0) to avoid a NaN projection matrix before the first resize.
  const defaultCamera = new PerspectiveCamera(75, 1, 0.1, 1000)
  defaultCamera.position.z = 5
  defaultCamera.lookAt(0, 0, 0)

  let manual = $state(false)
  let camera = $state.raw<PerspectiveCamera | OrthographicCamera>(defaultCamera)

  $effect.pre(() => {
    if (camera !== defaultCamera || manual) {
      return
    }
    const { width, height } = size.current
    defaultCamera.aspect = width / height
    defaultCamera.updateProjectionMatrix()
    defaultCamera.updateMatrixWorld()
    invalidate()
  })

  $effect.pre(() => {
    if (camera === undefined || makeDefaultCameras.size === 0) {
      camera = defaultCamera
      invalidate()
    }
  })

  const context: CameraContext = {
    makeDefaultCameras,
    camera: runeToCurrentWritable(
      () => camera,
      (value) => (camera = value)
    ),
    manual: {
      get current() {
        return manual
      },
      set(value) {
        manual = value
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

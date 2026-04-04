import { fromStore } from 'svelte/store'
import { useCamera as useDefaultCamera } from '../../../context/fragments/camera.svelte.js'
import { useThrelte } from '../../../context/compounds/useThrelte.js'
import { isInstanceOf } from '../../../utilities/isInstanceOf.js'
import type { OrthographicCamera, PerspectiveCamera } from 'three'

const updateProjectionMatrixKeys = new Set([
  'fov',
  'aspect',
  'near',
  'far',
  'left',
  'right',
  'top',
  'bottom',
  'zoom',
  'filmGauge',
  'filmOffset'
])

export const updateCamera = (
  camera: PerspectiveCamera | OrthographicCamera,
  width: number,
  height: number
) => {
  if (isInstanceOf(camera, 'PerspectiveCamera')) {
    camera.aspect = width / height
  } else if (isInstanceOf(camera, 'OrthographicCamera')) {
    camera.left = width / -2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = height / -2
  }

  camera.updateProjectionMatrix()
  camera.updateMatrixWorld()
}

export const useCamera = (
  getCamera: () => PerspectiveCamera | OrthographicCamera,
  getManual: () => boolean,
  getMakeDefault: () => boolean,
  props: () => Record<string, unknown>
) => {
  const { camera: defaultCamera, manual: defaultManual, makeDefaultCameras } = useDefaultCamera()
  const { invalidate, size: sizeStore } = useThrelte()

  const camera = $derived(getCamera())
  const manual = $derived(getManual())
  const size = fromStore(sizeStore)

  $effect.pre(() => {
    if (!getMakeDefault()) {
      return
    }

    const currentCamera = camera

    makeDefaultCameras.add(currentCamera)
    defaultCamera.set(currentCamera)
    defaultManual.set(manual)
    invalidate()

    return () => {
      makeDefaultCameras.delete(currentCamera)
    }
  })

  $effect.pre(() => {
    if (manual) {
      return
    }

    for (const key in props()) {
      if (updateProjectionMatrixKeys.has(key)) {
        camera.updateProjectionMatrix()
        invalidate()
        break
      }
    }
  })

  $effect.pre(() => {
    if (getManual()) {
      return
    }

    updateCamera(camera, size.current.width, size.current.height)
  })
}

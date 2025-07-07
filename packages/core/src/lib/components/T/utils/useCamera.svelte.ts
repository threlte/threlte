import { fromStore } from 'svelte/store'
import { useThrelte } from '../../../context/compounds/useThrelte'
import { isInstanceOf } from '../../../utilities'
import type { OrthographicCamera, PerspectiveCamera } from 'three'

const defaultCameras = new Set()

export const useCamera = (
  getCamera: () => PerspectiveCamera | OrthographicCamera,
  getManual: () => boolean,
  getMakeDefault: () => boolean
) => {
  const { invalidate, size: sizeStore, camera: defaultCamera } = useThrelte()

  const camera = $derived(getCamera())
  const size = fromStore(sizeStore)

  $effect.pre(() => {
    if (!getMakeDefault()) {
      return
    }

    defaultCameras.add(camera)
    defaultCamera.set(camera)
    invalidate()

    return () => {
      defaultCameras.delete(camera)
      if (defaultCameras.size === 0) {
        defaultCamera.set(undefined!)
        invalidate()
      }
    }
  })

  $effect.pre(() => {
    if (getManual()) {
      return
    }

    const { width, height } = size.current

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
    invalidate()
  })
}

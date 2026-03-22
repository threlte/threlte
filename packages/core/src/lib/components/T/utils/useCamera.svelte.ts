import { useThrelte } from '../../../context/compounds/useThrelte.js'
import { isInstanceOf } from '../../../utilities/index.js'
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

const defaultCameras = new Set()

export const useCamera = (
  getCamera: () => PerspectiveCamera | OrthographicCamera,
  getManual: () => boolean,
  getMakeDefault: () => boolean,
  props: () => Record<string, unknown>
) => {
  const { invalidate, size, camera: defaultCamera } = useThrelte()

  const camera = $derived(getCamera())
  const manual = $derived(getManual())

  $effect.pre(() => {
    if (!getMakeDefault()) {
      return
    }

    const current = camera

    defaultCameras.add(current)
    defaultCamera.current = current
    invalidate()

    return () => {
      defaultCameras.delete(current)
      if (defaultCameras.size === 0) {
        defaultCamera.current = defaultCamera.current
        invalidate()
      }
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

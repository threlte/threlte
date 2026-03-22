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
  camera: () => PerspectiveCamera | OrthographicCamera,
  manual: () => boolean,
  makeDefault: () => boolean,
  props: () => Record<string, unknown>
) => {
  const { invalidate, size, camera: defaultCamera } = useThrelte()

  $effect.pre(() => {
    if (!makeDefault()) {
      return
    }

    const current = camera()

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
    if (manual()) {
      return
    }

    const current = camera()

    for (const key in props()) {
      if (updateProjectionMatrixKeys.has(key)) {
        current.updateProjectionMatrix()
        invalidate()
        break
      }
    }
  })

  $effect.pre(() => {
    if (manual()) {
      return
    }

    const current = camera()
    const { width, height } = size.current

    if (isInstanceOf(current, 'PerspectiveCamera')) {
      current.aspect = width / height
    } else if (isInstanceOf(current, 'OrthographicCamera')) {
      current.left = width / -2
      current.right = width / 2
      current.top = height / 2
      current.bottom = height / -2
    }

    current.updateProjectionMatrix()
    current.updateMatrixWorld()
    invalidate()
  })
}

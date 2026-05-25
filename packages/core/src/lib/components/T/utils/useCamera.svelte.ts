import { fromStore } from 'svelte/store'
import { useCamera as useDefaultCamera } from '../../../context/fragments/camera.svelte.js'
import { useDOM } from '../../../context/fragments/dom.svelte.js'
import { useScheduler } from '../../../context/fragments/scheduler.svelte.js'
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
  camera: () => PerspectiveCamera | OrthographicCamera,
  manual: () => boolean,
  makeDefault: () => boolean,
  props: () => Record<string, unknown>
) => {
  const {
    camera: defaultCamera,
    manual: defaultManual,
    makeDefaultCameras,
    makeDefaultCameraManual
  } = useDefaultCamera()
  const { invalidate } = useScheduler()
  const { size: sizeStore } = useDOM()

  const size = fromStore(sizeStore)

  $effect.pre(() => {
    if (!makeDefault()) {
      return
    }

    const currentCamera = camera()
    const currentManual = manual()

    makeDefaultCameras.add(currentCamera)
    makeDefaultCameraManual.set(currentCamera, currentManual)
    defaultCamera.set(currentCamera)
    defaultManual.set(currentManual)
    invalidate()

    return () => {
      makeDefaultCameras.delete(currentCamera)
      makeDefaultCameraManual.delete(currentCamera)
      // If the unmounted camera was the active default, fall back to
      // another makeDefault camera. The size === 0 fallback in
      // camera.svelte.ts handles the case where no makeDefault cameras remain.
      const next = makeDefaultCameras.values().next().value
      if (defaultCamera.current === currentCamera) {
        if (next) {
          defaultCamera.set(next)
          defaultManual.set(makeDefaultCameraManual.get(next) ?? false)
        } else {
          defaultManual.set(false)
        }
        invalidate()
      }
    }
  })

  $effect.pre(() => {
    if (manual()) {
      return
    }

    const currentCamera = camera()

    for (const key in props()) {
      if (updateProjectionMatrixKeys.has(key)) {
        currentCamera.updateProjectionMatrix()
        invalidate()
        break
      }
    }
  })

  $effect.pre(() => {
    if (manual()) {
      return
    }

    updateCamera(camera(), size.current.width, size.current.height)
  })
}

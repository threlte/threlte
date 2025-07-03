import { fromStore } from 'svelte/store'
import { useThrelte } from '../../../context/compounds/useThrelte'
import { isInstanceOf } from '../../../utilities'
import type { MaybeInstance } from '../types'
import type { OrthographicCamera, PerspectiveCamera } from 'three'

export const useCamera = (
  getCamera: () => MaybeInstance<PerspectiveCamera | OrthographicCamera>,
  getManual: () => boolean,
  getMakeDefault: () => boolean
) => {
  const { invalidate, size: sizeStore, camera: defaultCamera } = useThrelte()

  const size = fromStore(sizeStore)
  const camera = $derived(getCamera())

  $effect.pre(() => {
    if (!getMakeDefault()) {
      return
    }

    const lastCamera = defaultCamera.current

    defaultCamera.set(camera)
    invalidate()

    return () => {
      defaultCamera.set(lastCamera)
      invalidate()
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

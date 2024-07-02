import { onDestroy } from 'svelte'
import { isOrthographicCamera, isPerspectiveCamera } from '../../../lib/camera'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
import type { Size } from '../../../types'
import { useThrelte } from '../../../context/compounds/useThrelte'

export const useCamera = () => {
  const { invalidate, size, camera } = useThrelte()

  let currentInstance: PerspectiveCamera | OrthographicCamera | undefined

  let unsubscribe: (() => void) | undefined = undefined
  onDestroy(() => {
    unsubscribe?.()
  })

  const subscriber = (size: Size) => {
    if (!currentInstance) return

    if (isOrthographicCamera(currentInstance)) {
      currentInstance.left = size.width / -2
      currentInstance.right = size.width / 2
      currentInstance.top = size.height / 2
      currentInstance.bottom = size.height / -2
      currentInstance.updateProjectionMatrix()
      currentInstance.updateMatrixWorld()
      invalidate()
    } else if (isPerspectiveCamera(currentInstance)) {
      currentInstance.aspect = size.width / size.height
      currentInstance.updateProjectionMatrix()
      currentInstance.updateMatrixWorld()
      invalidate()
    }
  }

  const update = (instance: PerspectiveCamera | OrthographicCamera, manual: boolean) => {
    unsubscribe?.()
    if (manual) {
      currentInstance = undefined
      return
    }
    currentInstance = instance
    unsubscribe = size.subscribe(subscriber)
  }

  const makeDefaultCamera = (
    instance: PerspectiveCamera | OrthographicCamera,
    makeDefault: boolean
  ) => {
    if (!makeDefault) return
    camera.set(instance)
    invalidate()
  }

  return {
    update,
    makeDefaultCamera
  }
}

import type { OrthographicCamera, Camera, PerspectiveCamera } from 'three'
import { useThrelte } from '../../hooks/useThrelte'
import { useThrelteRoot } from '../../hooks/useThrelteRoot'
import type { Size } from '../../types/types'

const isCamera = (value: any): value is Camera => {
  return value && value.isCamera
}

const isOrthographicCamera = (value: any): value is OrthographicCamera => {
  return value && value.isOrthographicCamera
}

const isPerspectiveCamera = (value: any): value is PerspectiveCamera => {
  return value && value.isPerspectiveCamera
}

export const useCamera = () => {
  const { invalidate } = useThrelte()

  const update = <T>(instance: T, size: Size, manual: boolean) => {
    if (manual) return
    if (isOrthographicCamera(instance)) {
      instance.left = size.width / -2
      instance.right = size.width / 2
      instance.top = size.height / 2
      instance.bottom = size.height / -2
      instance.updateProjectionMatrix()
      instance.updateMatrixWorld()
      invalidate()
    } else if (isPerspectiveCamera(instance)) {
      instance.aspect = size.width / size.height
      instance.updateProjectionMatrix()
      instance.updateMatrixWorld()
      invalidate()
    }
  }

  const { setCamera } = useThrelteRoot()

  const makeDefaultCamera = <T>(instance: T, makeDefault: boolean) => {
    if (!isCamera(instance) || !makeDefault) return
    setCamera(instance)
    invalidate()
  }

  return {
    update,
    makeDefaultCamera
  }
}

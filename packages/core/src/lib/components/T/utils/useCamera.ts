import { writable } from 'svelte/store'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
import { useThrelte } from '../../../context/compounds/useThrelte'
import { isInstanceOf, watch } from '../../../utilities'

const isPerspectiveOrOrthographicCamera = (
  value: unknown
): value is PerspectiveCamera | OrthographicCamera => {
  return isInstanceOf(value, 'PerspectiveCamera') || isInstanceOf(value, 'OrthographicCamera')
}

export const useCamera = () => {
  const { invalidate, size, camera } = useThrelte()

  const currentRef = writable<PerspectiveCamera | OrthographicCamera | undefined>()
  const manual = writable(true)
  const makeDefault = writable(false)

  watch([currentRef, makeDefault], ([ref, makeDefault]) => {
    if (!ref || !makeDefault) return
    const lastCamera = camera.current
    camera.set(ref)
    invalidate()
    return () => {
      camera.set(lastCamera)
      invalidate()
    }
  })

  watch([currentRef, manual, size], ([ref, manual, size]) => {
    if (!ref || manual) return
    if (isInstanceOf(ref, 'OrthographicCamera')) {
      ref.left = size.width / -2
      ref.right = size.width / 2
      ref.top = size.height / 2
      ref.bottom = size.height / -2
      ref.updateProjectionMatrix()
      ref.updateMatrixWorld()
      invalidate()
    } else if (isInstanceOf(ref, 'PerspectiveCamera')) {
      ref.aspect = size.width / size.height
      ref.updateProjectionMatrix()
      ref.updateMatrixWorld()
      invalidate()
    }
  })

  const updateRef = (ref: unknown) => {
    if (!isPerspectiveOrOrthographicCamera(ref)) return
    currentRef.set(ref)
  }

  const updateManual = (m: boolean) => {
    manual.set(m)
  }

  const updateMakeDefault = (d: boolean) => {
    makeDefault.set(d)
  }

  return {
    updateRef,
    updateManual,
    updateMakeDefault
  }
}

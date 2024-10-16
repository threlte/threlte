import { writable } from 'svelte/store'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
import { useThrelte } from '../../../context/compounds/useThrelte'
import { watch } from '../../../lib/storeUtils'

const isOrthographicCamera = (value: unknown): value is OrthographicCamera => {
  return typeof value === 'object' && value !== null && 'isOrthographicCamera' in value
}

const isPerspectiveCamera = (value: unknown): value is PerspectiveCamera => {
  return typeof value === 'object' && value !== null && 'isPerspectiveCamera' in value
}

const isPerspectiveOrOrthographicCamera = (
  value: unknown
): value is PerspectiveCamera | OrthographicCamera => {
  return isPerspectiveCamera(value) || isOrthographicCamera(value)
}

export const useCamera = () => {
  const { invalidate, size, camera } = useThrelte()

  const currentRef = writable<PerspectiveCamera | OrthographicCamera | undefined>()
  const manual = writable(true)
  const makeDefault = writable(false)

  watch([currentRef, makeDefault], ([ref, makeDefault]) => {
    if (!ref || !makeDefault) return
    camera.set(ref)
    invalidate()
  })

  watch([currentRef, manual, size], ([ref, manual, size]) => {
    if (!ref || manual) return
    if (isOrthographicCamera(ref)) {
      ref.left = size.width / -2
      ref.right = size.width / 2
      ref.top = size.height / 2
      ref.bottom = size.height / -2
      ref.updateProjectionMatrix()
      ref.updateMatrixWorld()
      invalidate()
    } else if (isPerspectiveCamera(ref)) {
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

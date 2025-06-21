import { fromStore } from 'svelte/store'
import { useThrelte } from '../../../context/compounds/useThrelte'
import { isInstanceOf } from '../../../utilities'
import type { MaybeInstance } from '../types'

export const useCamera = <T>(
  ref: () => MaybeInstance<T>,
  manual: () => boolean,
  makeDefault: () => boolean
) => {
  const { invalidate, size, camera } = useThrelte()

  const s = fromStore(size)
  const r = $derived(ref())
  const cam = $derived(
    isInstanceOf(r, 'PerspectiveCamera') || isInstanceOf(r, 'OrthographicCamera') ? r : undefined
  )

  $effect.pre(() => {
    if (cam && makeDefault()) {
      camera.set(cam)
      invalidate()
    }
  })

  $effect.pre(() => {
    if (!cam || manual()) return

    const { width, height } = s.current

    if (isInstanceOf(cam, 'OrthographicCamera')) {
      cam.left = width / -2
      cam.right = width / 2
      cam.top = height / 2
      cam.bottom = height / -2
      cam.updateProjectionMatrix()
      cam.updateMatrixWorld()
      invalidate()
    } else if (isInstanceOf(cam, 'PerspectiveCamera')) {
      cam.aspect = width / height
      cam.updateProjectionMatrix()
      cam.updateMatrixWorld()
      invalidate()
    }
  })
}

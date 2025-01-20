import { isInstanceOf } from '@threlte/core'
import { createTransition } from '@threlte/extras'
import { cubicOut } from 'svelte/easing'
import { mapLinear } from 'three/src/math/MathUtils.js'

export const scale = (scale: number) => {
  return createTransition((ref) => {
    if (!isInstanceOf(ref, 'Object3D')) return

    return {
      duration: 600,
      tick(t) {
        ref.scale.setScalar(mapLinear(t, 0, 1, scale, 1))
      },
      easing: cubicOut
    }
  })
}

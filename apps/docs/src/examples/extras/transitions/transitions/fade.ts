import { isInstanceOf } from '@threlte/core'
import { createTransition } from '@threlte/extras'
import { cubicOut } from 'svelte/easing'

export const fade = (opacity = 0) => {
  return createTransition((ref) => {
    if (!isInstanceOf(ref, 'Material')) return

    if (!ref.transparent) {
      ref.transparent = true
      ref.needsUpdate = true
    }

    return {
      duration: 600,
      tick: (t: number) => {
        ref.opacity = t * (1 - opacity)
      },
      easing: cubicOut
    }
  })
}

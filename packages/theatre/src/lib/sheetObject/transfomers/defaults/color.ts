import { types } from '@theatre/core'
import type { Color } from 'three'
import { createTransformer } from '../createTransformer'

export const color = createTransformer<Color>().build({
  initialize(value) {
    return types.rgba({ r: value.r, g: value.g, b: value.b, a: 1 })
  },
  apply(target, path, value) {
    target[path].r = value.r
    target[path].g = value.g
    target[path].b = value.b
  }
})

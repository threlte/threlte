import { types } from '../../../theatre.js'
import { createTransformer } from '../createTransformer.js'
import { Color, SRGBColorSpace } from 'three'

const _color = new Color()

export const color = createTransformer({
  transform(value) {
    value.getRGB(_color, SRGBColorSpace)
    return types.rgba({ r: _color.r, g: _color.g, b: _color.b, a: 1 })
  },
  apply(target, path, value) {
    target[path].setRGB(value.r, value.g, value.b, SRGBColorSpace)
  }
})

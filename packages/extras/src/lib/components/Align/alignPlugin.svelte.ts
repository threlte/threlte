import { injectPlugin, isInstanceOf, observe } from '@threlte/core'

export const injectAlignPlugin = (align: () => void) => {
  injectPlugin('align-plugin', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return

    observe.pre(
      () => [args.ref],
      () => {
        align()
        return align
      }
    )
  })
}

import { injectPlugin, isInstanceOf, useThrelte } from '@threlte/core'

export const injectLookAtPlugin = () => {
  injectPlugin<{
    lookAt: [number, number, number]
  }>('lookAt', (args) => {
    // skip injection if ref is not an Object3D
    if (!isInstanceOf(args.ref, 'Object3D')) return

    // get the invalidate function from the useThrelte hook
    const { invalidate } = useThrelte()

    $effect(() => {
      if (!args.props.lookAt) return
      args.ref.lookAt(...args.props.lookAt)
      invalidate()
    })

    return {
      pluginProps: ['lookAt']
    }
  })
}

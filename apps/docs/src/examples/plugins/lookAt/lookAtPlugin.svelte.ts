import { injectPlugin, isInstanceOf, useThrelte } from '@threlte/core'
import type { Object3D } from 'three'

export type LookAt = Parameters<Object3D['lookAt']>

export const injectLookAtPlugin = () => {
  injectPlugin<{
    lookAt: LookAt
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

import { injectPlugin, isInstanceOf } from '@threlte/core'
import { usePointerControls } from './hook.js'
import { events } from './types.js'

export const injectPointerControlsPlugin = (): void => {
  injectPlugin('threlte-pointer-controls', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return

    const { addInteractiveObject, removeInteractiveObject } = usePointerControls()

    $effect.pre(() => {
      const ref = args.ref
      const props = args.props

      const hasEventHandlers = events.some((eventName) => typeof props[eventName] === 'function')

      if (!hasEventHandlers) return

      addInteractiveObject(ref, props)
      return () => {
        removeInteractiveObject(ref)
      }
    })

    return {
      pluginProps: events
    }
  })
}

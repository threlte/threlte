import { injectPlugin, isInstanceOf } from '@threlte/core'
import { useTouchControls } from './hook.js'
import { events } from './types.js'

export const injectTouchControlsPlugin = (): void => {
  injectPlugin('threlte-touch-controls', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return

    const { addInteractiveObject, removeInteractiveObject } = useTouchControls()

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

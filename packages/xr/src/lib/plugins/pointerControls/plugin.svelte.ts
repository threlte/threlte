import { injectPlugin, isInstanceOf, observe } from '@threlte/core'
import { usePointerControls } from './hook.js'
import { events, type ThrelteXREvents } from './types.js'

export const injectPointerControlsPlugin = (): void => {
  injectPlugin('threlte-pointer-controls', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return

    const hasEventHandlers = Object.entries(args.props).some(([key, value]) => {
      return value !== undefined && events.includes(key as keyof ThrelteXREvents)
    })

    if (!hasEventHandlers) return

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

    observe.pre(
      () => [args.ref],
      ([ref]) => {
        addInteractiveObject(ref, args.props)
        return () => removeInteractiveObject(ref)
      }
    )

    return {
      pluginProps: events
    }
  })
}

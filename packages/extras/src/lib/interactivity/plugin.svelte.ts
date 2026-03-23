import { injectPlugin, isInstanceOf, observe } from '@threlte/core'
import { useInteractivity } from './context.js'
import type { ThrelteEvents } from './types.js'

export const interactivityEventNames: (keyof ThrelteEvents)[] = [
  'onclick',
  'oncontextmenu',
  'ondblclick',
  'onwheel',
  'onpointerup',
  'onpointerdown',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onpointermove',
  'onpointermissed'
]

export const injectInteractivityPlugin = (): void => {
  injectPlugin('interactivity', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return

    const hasEventHandlers = Object.entries(args.props).some(([key, value]) => {
      return value !== undefined && interactivityEventNames.includes(key as keyof ThrelteEvents)
    })

    if (!hasEventHandlers) return

    const { addInteractiveObject, removeInteractiveObject } = useInteractivity()

    observe.pre(
      () => [args.ref],
      ([ref]) => {
        addInteractiveObject(ref, args.props)
        return () => {
          removeInteractiveObject(ref)
        }
      }
    )

    return {
      pluginProps: interactivityEventNames
    }
  })
}

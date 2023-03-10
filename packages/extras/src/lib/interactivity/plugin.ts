import { injectPlugin } from '@threlte/core'
import { Object3D } from 'three'
import { useInteractivity } from './hook'
import type { ThrelteEvents, State } from './types'
import { useComponentEvents } from './useComponentEvents'

export const interactivityEventNames: (keyof ThrelteEvents)[] = [
  'click',
  'contextmenu',
  'dblclick',
  'wheel',
  'pointerup',
  'pointerdown',
  'pointerover',
  'pointerout',
  'pointerenter',
  'pointerleave',
  'pointermove',
  'pointermissed'
]

export const injectInteractivityPlugin = (state: State) => {
  injectPlugin('interactivity', ({ ref }) => {
    if (!(ref instanceof Object3D)) return

    const { addInteractiveObject, removeInteractiveObject } = useInteractivity()

    let currentRef = ref
    let isListeningToEvents = false

    useComponentEvents(() => {
      isListeningToEvents = true
      addInteractiveObject(currentRef)
    }, interactivityEventNames as unknown as string[])

    return {
      onRefChange(ref: Object3D) {
        if (!isListeningToEvents || ref.uuid === currentRef.uuid) return

        currentRef = ref

        removeInteractiveObject(currentRef)
        addInteractiveObject(currentRef)
      }
    }
  })
}

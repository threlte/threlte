import { createRawEventDispatcher } from '@threlte/core'
import { getControlsContext } from './context'
import type { Object3D } from 'three'

export const usePointerControls = () => {
  const context = getControlsContext()
  const eventDispatcher = createRawEventDispatcher()

  const addInteractiveObject = (object: Object3D) => {
    object.userData._threlte_interactivity_dispatcher = eventDispatcher

    // check if the object is already in the list
    if (context.interactiveObjects.indexOf(object) > -1) {
      return
    }

    context.interactiveObjects.push(object)
  }

  const removeInteractiveObject = (object: Object3D) => {
    const index = context.interactiveObjects.indexOf(object)
    context.interactiveObjects.splice(index, 1)
    
    delete object.userData._threlte_interactivity_dispatcher
  }

  return {
    addInteractiveObject,
    removeInteractiveObject
  }
}

import { createRawEventDispatcher } from '@threlte/core'
import { getControlsContext, getInternalContext } from './context'
import type { Object3D } from 'three'

export const usePointerControls = () => {
  const { dispatchers } = getInternalContext()
  const context = getControlsContext()
  const eventDispatcher = createRawEventDispatcher()

  const addInteractiveObject = (object: Object3D) => {
    // check if the object is already in the list
    if (context.interactiveObjects.indexOf(object) > -1) {
      return
    }

    dispatchers.set(object, eventDispatcher)
    context.interactiveObjects.push(object)
  }

  const removeInteractiveObject = (object: Object3D) => {
    const index = context.interactiveObjects.indexOf(object)
    context.interactiveObjects.splice(index, 1)
    dispatchers.delete(object)
  }

  return {
    addInteractiveObject,
    removeInteractiveObject
  }
}

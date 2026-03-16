import { getControlsContext, getInternalContext } from './context.js'
import type { Object3D } from 'three'

export const usePointerControls = () => {
  const context = getControlsContext()
  const { dispatchers } = getInternalContext()

  if (!context) {
    throw new Error(
      'No pointer controls context found. Did you forget to implement pointerControls()?'
    )
  }

  const addInteractiveObject = (
    object: Object3D,
    events: Record<string, (arg: unknown) => void>
  ) => {
    // check if the object is already in the list
    if (context.interactiveObjects.indexOf(object) > -1) {
      return
    }

    dispatchers.set(object, events)
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

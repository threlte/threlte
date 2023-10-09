import { createRawEventDispatcher } from '@threlte/core'
import { getControlsContext } from './context'
import type { Object3D } from 'three'

export const usePointerControls = () => {
  const state = getControlsContext()
  const eventDispatcher = createRawEventDispatcher()

  const addInteractiveObject = (object: Object3D) => {
    if (!state) {
      console.warn('No pointerControls context found. Did you forget to implement pointerControls()?')
      return
    }
  
    object.userData._threlte_interactivity_dispatcher = eventDispatcher

    // check if the object is already in the list
    if (state.interactiveObjects.some((obj) => obj.uuid === object.uuid)) return

    state.interactiveObjects.push(object)
  }

  const removeInteractiveObject = (object: Object3D) => {
    if (!state) {
      console.warn('No pointerControls context found. Did you forget to implement pointerControls()?')
      return
    }

    const index = state.interactiveObjects.findIndex((value) => value.uuid === object.uuid)
    state.interactiveObjects.splice(index, 1)
    
    delete object.userData._threlte_interactivity_dispatcher
  }

  return {
    ...state,
    addInteractiveObject,
    removeInteractiveObject
  }
}

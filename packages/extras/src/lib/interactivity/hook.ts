import { createRawEventDispatcher } from '@threlte/core'
import { getContext } from 'svelte'
import type { Object3D } from 'three'
import type { State } from './types'

export const useInteractivity = () => {
  const state = getContext<State>('threlte-interactivity-context')

  const eventDispatcher = createRawEventDispatcher()

  const addInteractiveObject = (object: Object3D) => {
    if (!state) {
      console.warn('No interactivity context found. Did you forget to implement interactivity()?')
      return
    }
    object.userData._threlte_interactivity_dispatcher = eventDispatcher
    state.interactiveObjects.push(object)
  }

  const removeInteractiveObject = (object: Object3D) => {
    if (!state) {
      console.warn('No interactivity context found. Did you forget to implement interactivity()?')
      return
    }
    state.interactiveObjects = state.interactiveObjects.filter((obj) => obj.uuid !== object.uuid)
    delete object.userData._threlte_interactivity_dispatcher
  }

  return {
    ...state,
    addInteractiveObject,
    removeInteractiveObject
  }
}

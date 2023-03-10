import { createRawEventDispatcher } from '@threlte/core'
import { getContext } from 'svelte'
import type { Object3D } from 'three'
import type { State } from './types'

export const useInteractivity = () => {
  const state = getContext<State>('threlte-interactivity-context')
  if (!state) throw new Error('useInteractivity must be used within a <Interactivity> component')

  const eventDispatcher = createRawEventDispatcher()

  const addInteractiveObject = (object: Object3D) => {
    object.userData._threlte_interactivity_dispatcher = eventDispatcher
    state.interactiveObjects.push(object)
  }

  const removeInteractiveObject = (object: Object3D) => {
    state.interactiveObjects = state.interactiveObjects.filter((obj) => obj.uuid !== object.uuid)
    delete object.userData._threlte_interactivity_dispatcher
  }

  return {
    addInteractiveObject,
    removeInteractiveObject
  }
}

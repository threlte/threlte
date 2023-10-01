import { memoize, useThrelte, watch } from '@threlte/core'
import type { ComputeFunction, State } from './types'
import { useController, useHand } from '../../hooks'

export const getDefaultComputeFunction = (state: State): ComputeFunction => {
  const leftController = useController('left')
  const rightController = useController('right')
  const leftHand = useHand('left')
  const rightHand = useHand('right')

  return (event, state) => {
    state.pointer.update((pointer) => {
      pointer.set((event.offsetX / width) * 2 - 1, -(event.offsetY / height) * 2 + 1)
      return pointer
    })
    state.raycaster.set()
    state.raycaster.setFromCamera(state.pointer.current, camera.current)
  }
}

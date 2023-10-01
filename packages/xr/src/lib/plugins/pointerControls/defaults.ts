import type { ComputeFunction, State } from './types'
import { useController, useHand } from '../../hooks'

export const getDefaultComputeFunction = (state: State): ComputeFunction => {
  const controller = useController(state.hand)
  const hand = useHand(state.hand)

  return (event, state) => {
    state.pointer.update((pointer) => {
      pointer.set((event.offsetX / width) * 2 - 1, -(event.offsetY / height) * 2 + 1)
      return pointer
    })
    state.raycaster.set()
    state.raycaster.setFromCamera(state.pointer.current, camera.current)
  }
}

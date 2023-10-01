import * as THREE from 'three'
import type { ComputeFunction, State } from './types'

export const getDefaultComputeFunction = (): ComputeFunction => {
  return (event, state: State) => {
    state.pointer.update((pointer) => {
      pointer.set(0, 0, 0)
      return pointer
    })
    state.raycaster.set(state.pointer.current, new THREE.Vector3(0, 0, -1))
  }
}

import * as THREE from 'three'
import type { ComputeFunction, State } from './types'
import { useController } from '../../hooks/useController'
import { useHand } from '../../hooks/useHand'

export const getDefaultComputeFunction = (handedness: 'left' | 'right'): ComputeFunction => {
  const controller = useController(handedness)
  const hand = useHand(handedness)

  return (state: State) => {
    const origin = controller.current?.targetRay

    if (origin === undefined) return

    state.raycaster.set(origin.position, new THREE.Vector3(0, 0, -1))
  }
}

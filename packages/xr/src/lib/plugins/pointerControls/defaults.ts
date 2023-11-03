import { Vector3 } from 'three'
import type { ComputeFunction, State, HandState } from './types'
import { useController } from '../../hooks/useController'
import { useHand } from '../../hooks/useHand'

export const getDefaultComputeFunction = (): ComputeFunction => {
  const controllers = {
    left: useController('left'),
    right: useController('right')
  }

  const hands = {
    left: useHand('left'),
    right: useHand('right')
  }

  const forward = new Vector3()

  return (context: State, handContext: HandState) => {
    const origin = controllers[handContext.hand].current?.targetRay

    if (origin === undefined) return

    forward.set(0, 0, -1)
    forward.applyQuaternion(origin.quaternion)

    context.raycaster.set(origin.position, forward)
  }
}
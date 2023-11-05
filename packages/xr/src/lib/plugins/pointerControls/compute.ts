import { Vector3 } from 'three'
import type { ControlsContext, HandContext } from './types'
import { useController } from '../../hooks/useController'

export type ComputeFunction = (state: ControlsContext, handState: HandContext) => void

const controllers = {
  left: useController('left'),
  right: useController('right')
} as const

const forward = new Vector3()

export const defaultComputeFunction: ComputeFunction = (context: ControlsContext, handContext: HandContext) => {
  const targetRay = controllers[handContext.hand].current?.targetRay

  if (targetRay === undefined) return

  forward.set(0, 0, -1).applyQuaternion(targetRay.quaternion)

  context.raycaster.set(targetRay.position, forward)
}

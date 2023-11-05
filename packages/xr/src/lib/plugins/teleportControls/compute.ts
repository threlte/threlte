import { Vector3 } from 'three'
import { useController } from '../../hooks/useController'
import type { Context, HandContext } from './context'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

const controllers = {
  left: useController('left'),
  right: useController('right')
}

const forward = new Vector3()

export const defaultComputeFunction = (context: Context, handContext: HandContext) => {
  const targetRay = controllers[handContext.hand].current?.targetRay

  if (targetRay === undefined) return

  forward.set(0, 0, -1).applyQuaternion(targetRay.quaternion)

  context.raycaster.set(targetRay.position, forward)
}

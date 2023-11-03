import { Vector3 } from 'three'
import { useController } from '../../hooks/useController'
import type { Context, HandContext } from './context'

export const getDefaultComputeFunction = () => {
  const controllers = {
    left: useController('left'),
    right: useController('right')
  }

  const forward = new Vector3()

  return (context: Context, handContext: HandContext) => {
    const origin = controllers[handContext.hand].current?.targetRay

    if (origin === undefined) return

    forward.set(0, 0, -1)
    forward.applyQuaternion(origin.quaternion)

    context.raycaster.set(origin.position, forward)
  }
}
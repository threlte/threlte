import { Vector3 } from 'three'
import { controllers } from '../../hooks/useController.svelte.js'
import type { Context, HandContext } from './context.js'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

const forward = new Vector3()

export const defaultComputeFunction = (context: Context, handContext: HandContext) => {
  const targetRay = controllers[handContext.hand]?.targetRay

  if (targetRay === undefined) return

  forward.set(0, 0, -1).applyQuaternion(targetRay.quaternion)

  context.raycaster.set(targetRay.position, forward)
}

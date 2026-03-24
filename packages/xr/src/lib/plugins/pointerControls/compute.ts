import { Vector3 } from 'three'
import type { ControlsContext, HandContext } from './types.js'
import { controllers } from '../../hooks/useController.svelte.js'

export type ComputeFunction = (state: ControlsContext, handState: HandContext) => void

const forward = new Vector3()

export const defaultComputeFunction: ComputeFunction = (
  context: ControlsContext,
  handContext: HandContext
) => {
  const targetRay = controllers[handContext.hand]?.targetRay

  if (targetRay === undefined) return

  forward.set(0, 0, -1).applyQuaternion(targetRay.quaternion)

  context.raycaster.set(targetRay.position, forward)
}

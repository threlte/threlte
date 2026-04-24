import { Vector3 } from 'three'
import type { ControlsContext, HandContext } from './types.js'
import { controllers } from '../../hooks/useController.svelte.js'

export type ComputeFunction = (state: ControlsContext, handState: HandContext) => void

const origin = new Vector3()
const forward = new Vector3()

export const defaultComputeFunction: ComputeFunction = (
  context: ControlsContext,
  handContext: HandContext
) => {
  const targetRay = controllers[handContext.hand]?.targetRay

  if (targetRay === undefined) return

  // Read origin/direction from matrixWorld so the ray is in real world space,
  // even when an ancestor (e.g. <XROrigin>) has a non-identity transform.
  // Force an update because this runs before the frame's scene.updateMatrixWorld.
  targetRay.updateWorldMatrix(true, false)

  origin.setFromMatrixPosition(targetRay.matrixWorld)
  forward.set(0, 0, -1).transformDirection(targetRay.matrixWorld)

  context.raycaster.set(origin, forward)
}

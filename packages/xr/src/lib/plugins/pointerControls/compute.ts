import { Vector3 } from 'three'
import type { ControlsContext, HandContext } from './types.js'
import { getControllerState, getHandState } from '../../internal/inputSources.svelte.js'

export type ComputeFunction = (state: ControlsContext, handState: HandContext) => void

const origin = new Vector3()
const forward = new Vector3()

export const defaultComputeFunction: ComputeFunction = (
  _context: ControlsContext,
  handContext: HandContext
) => {
  const state =
    handContext.sourceType === 'controller'
      ? getControllerState(handContext.hand)
      : getHandState(handContext.hand)
  const targetRay = state?.targetRay

  if (targetRay === undefined) return

  // Read origin/direction from matrixWorld so the ray is in real world space,
  // even when an ancestor (e.g. <XROrigin>) has a non-identity transform.
  // Force an update because this runs before the frame's scene.updateMatrixWorld.
  targetRay.updateWorldMatrix(true, false)

  origin.setFromMatrixPosition(targetRay.matrixWorld)
  forward.set(0, 0, -1).transformDirection(targetRay.matrixWorld)

  handContext.raycaster.set(origin, forward)
}

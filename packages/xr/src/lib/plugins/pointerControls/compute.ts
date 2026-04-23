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

  // Use the world matrix so the ray matches the visibly-rendered controller
  // even when <Controller> is nested in a parent transform (e.g. a dolly rig).
  // Force-update because this runs before the frame's scene.updateMatrixWorld.
  targetRay.updateWorldMatrix(true, false)

  origin.setFromMatrixPosition(targetRay.matrixWorld)
  forward.set(0, 0, -1).transformDirection(targetRay.matrixWorld)

  context.raycaster.set(origin, forward)
}

import { Vector3 } from 'three'
import { controllers } from '../../hooks/useController.svelte.js'
import { hands } from '../../hooks/useHand.svelte.js'
import type { Context, HandContext } from './context.js'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

const origin = new Vector3()
const forward = new Vector3()

export const defaultComputeFunction = (context: Context, handContext: HandContext) => {
  const targetRay = controllers[handContext.hand]?.targetRay ?? hands[handContext.hand]?.targetRay

  if (targetRay === undefined) return

  // Read origin/direction from matrixWorld so the ray is in real world space,
  // even when an ancestor (e.g. <XROrigin>) has a non-identity transform.
  // Force an update because this runs before the frame's scene.updateMatrixWorld.
  targetRay.updateWorldMatrix(true, false)

  origin.setFromMatrixPosition(targetRay.matrixWorld)
  forward.set(0, 0, -1).transformDirection(targetRay.matrixWorld)

  context.raycaster.set(origin, forward)
}

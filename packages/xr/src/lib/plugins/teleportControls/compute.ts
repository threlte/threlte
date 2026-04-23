import { Vector3 } from 'three'
import { controllers } from '../../hooks/useController.svelte.js'
import type { Context, HandContext } from './context.js'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

const origin = new Vector3()
const forward = new Vector3()

export const defaultComputeFunction = (context: Context, handContext: HandContext) => {
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

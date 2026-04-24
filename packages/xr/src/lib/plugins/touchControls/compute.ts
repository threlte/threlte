import { hands } from '../../hooks/useHand.svelte.js'
import type { ControlsContext, HandContext } from './types.js'

export type ComputeFunction = (context: ControlsContext, handContext: HandContext) => void

export const defaultComputeFunction: ComputeFunction = (context, handContext) => {
  handContext.originValid = false

  const xrhand = hands[handContext.hand]
  if (xrhand === undefined) return

  const jointSpace = xrhand.hand.joints[context.joint]
  if (jointSpace === undefined || jointSpace.jointRadius === undefined) return

  jointSpace.updateWorldMatrix(true, false)
  handContext.origin.setFromMatrixPosition(jointSpace.matrixWorld)
  handContext.originValid = true
}

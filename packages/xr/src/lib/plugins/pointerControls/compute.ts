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

  // `<Controller>` attaches targetRay to the scene root so local === world;
  // we can read `.position`/`.quaternion` directly without a matrixWorld
  // roundtrip (which would force-recompose the matrix three.js writes from
  // the XR pose and introduce a drift against the visible render).
  forward.set(0, 0, -1).applyQuaternion(targetRay.quaternion)

  context.raycaster.set(targetRay.position, forward)
}

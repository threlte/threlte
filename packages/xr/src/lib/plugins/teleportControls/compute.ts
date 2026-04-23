import { Vector3 } from 'three'
import { controllers } from '../../hooks/useController.svelte.js'
import type { Context, HandContext } from './context.js'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

const forward = new Vector3()

export const defaultComputeFunction = (context: Context, handContext: HandContext) => {
  const targetRay = controllers[handContext.hand]?.targetRay

  if (targetRay === undefined) return

  // `<Controller>` attaches targetRay to the scene root so local === world;
  // we can read `.position`/`.quaternion` directly without a matrixWorld
  // roundtrip (which would force-recompose the matrix three.js writes from
  // the XR pose and introduce a drift against the visible render).
  forward.set(0, 0, -1).applyQuaternion(targetRay.quaternion)

  context.raycaster.set(targetRay.position, forward)
}

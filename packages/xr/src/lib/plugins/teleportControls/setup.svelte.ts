import type { Context, HandContext } from './context.js'
import { controllers } from '../../hooks/useController.svelte.js'
import { useTeleport } from '../../hooks/useTeleport.js'
import { useFixed } from '../../internal/useFixed.js'
import { isPresenting, teleportIntersection } from '../../internal/state.svelte.js'

export const setupTeleportControls = (
  context: Context,
  handContext: HandContext,
  fixedStep = 1 / 40
) => {
  const handedness = handContext.hand
  const controller = $derived(controllers[handedness])
  const teleport = useTeleport()

  const handleHoverEnd = () => {
    handContext.hovered.current = undefined
    teleportIntersection[handedness] = undefined
  }

  useFixed(
    () => {
      const gamepad = controller?.inputSource.gamepad

      if (gamepad === undefined) {
        return
      }

      const selecting = (gamepad.axes[3] ?? 0) < -0.8

      if (handContext.active.current && !selecting) {
        handContext.active.current = false
      } else if (!handContext.active.current && selecting) {
        handContext.active.current = true
      }

      if (!handContext.active.current) {
        if (handContext.hovered.current !== undefined) {
          teleport(handContext.hovered.current.point)
          handleHoverEnd()
        }
        return
      }

      context.compute(context, handContext)

      const [intersect] = context.raycaster.intersectObjects(context.interactiveObjects, true)

      if (intersect === undefined) {
        if (handContext.hovered.current !== undefined) {
          handleHoverEnd()
        }
        return
      }

      if (intersect !== undefined && context.blockers.has(intersect.object.uuid)) {
        if (handContext.hovered.current !== undefined) {
          handleHoverEnd()
        }
        return
      }

      teleportIntersection[handedness] = intersect
      handContext.hovered.current = intersect
    },
    {
      fixedStep,
      running: () => isPresenting.current && handContext.enabled.current
    }
  )
}

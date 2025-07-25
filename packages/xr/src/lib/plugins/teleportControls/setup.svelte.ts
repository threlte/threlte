import { observe } from '@threlte/core'
import type { Context, HandContext } from './context'
import { controllers } from '../../hooks/useController.svelte'
import { useTeleport } from '../../hooks/useTeleport'
import { useFixed } from '../../internal/useFixed'
import { isPresenting, teleportIntersection } from '../../internal/state.svelte'

export const setupTeleportControls = (
  context: Context,
  handContext: HandContext,
  fixedStep = 1 / 40
) => {
  const handedness = handContext.hand
  const controller = $derived(controllers[handedness])
  const teleport = useTeleport()

  const handleHoverEnd = () => {
    handContext.hovered.set(undefined)
    teleportIntersection[handedness] = undefined
  }

  const { start, stop } = useFixed(
    () => {
      const gamepad = controller?.inputSource.gamepad

      if (gamepad === undefined) {
        return
      }

      const selecting = (gamepad.axes[3] ?? 0) < -0.8

      if (handContext.active.current && !selecting) {
        handContext.active.set(false)
      } else if (!handContext.active.current && selecting) {
        handContext.active.set(true)
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
      handContext.hovered.set(intersect)
    },
    {
      fixedStep,
      autoStart: false
    }
  )

  observe.pre(
    () => [isPresenting.current, handContext.enabled],
    ([isPresenting, $enabled]) => {
      if (isPresenting && $enabled) {
        start()
      } else {
        stop()
      }
    }
  )
}

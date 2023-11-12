import { watch } from '@threlte/core'
import { useXR } from '../../hooks/useXR'
import type { Context, HandContext } from './context'
import { useController } from '../../hooks/useController'
import { useTeleport } from '../../hooks/useTeleport'
import { useFixed } from '../../internal/useFixed'
import { teleportIntersection } from '../../internal/stores'

export const setupTeleportControls = (
  context: Context,
  handContext: HandContext,
  fixedStep = 1 / 40
) => {
  const handedness = handContext.hand
  const controller = useController(handedness)
  const teleport = useTeleport()

  const { start, stop } = useFixed(
    () => {
      const gamepad = controller.current?.inputSource.gamepad

      if (gamepad === undefined) {
        return
      }

      handContext.hovering.set((gamepad.axes[3] ?? 0) < -0.8)

      if (!handContext.hovering.current) {
        if (handContext.hovered.current !== undefined) {
          teleport(handContext.hovered.current.point)
          handContext.hovered.set(undefined)
        }
        return
      }

      context.compute(context, handContext)

      const [intersect] = context.raycaster.intersectObjects(context.interactiveObjects, true)

      teleportIntersection[handedness].set(intersect)

      if (intersect === undefined) {
        handContext.hovered.set(undefined)
        return
      }

      if (context.blockers.has(intersect.object.uuid)) {
        handContext.hovered.set(undefined)
        return
      }

      handContext.hovered.set(intersect)
    },
    {
      fixedStep,
      autostart: false
    }
  )

  watch([useXR().isPresenting, handContext.enabled], ([isPresenting, enabled]) => {
    if (isPresenting && enabled) {
      start()
    } else {
      stop()
    }
  })
}

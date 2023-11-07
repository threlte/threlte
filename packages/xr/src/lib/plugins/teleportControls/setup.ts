import { watch } from '@threlte/core'
import { useXR } from '../../hooks/useXR'
import { useController } from '../../hooks/useController'
import { useTeleport } from '../../hooks/useTeleport'
import { useFixed } from '../../internal/useFixed'
import type { Context, HandContext } from './context'

export const setupTeleportControls = (context: Context, handContext: HandContext, fixedStep = 1 / 40) => {
  const xrState = useXR()
  const controller = useController(handContext.hand)
  const teleport = useTeleport()

  const { start, stop } = useFixed(() => {
    const gamepad = controller.current?.inputSource.gamepad

    if (gamepad === undefined) {
      return
    }

    handContext.selecting.set((gamepad.axes[3] ?? 0) < -0.8)

    if (!handContext.selecting.current) {
      if (handContext.hovered.current !== undefined) {
        teleport(handContext.hovered.current.point)
        handContext.hovered.set(undefined)
      }
      return
    }

    context.compute(context, handContext)

    const [intersect] = context.raycaster.intersectObjects(context.interactiveObjects, true)

    if (intersect === undefined) {
      handContext.hovered.set(undefined)
      return
    }

    if (context.blockers.has(intersect.object.uuid)) {
      return
    }

    handContext.hovered.set(intersect)
  }, {
    fixedStep,
    autostart: false,
  })

  watch([xrState.isPresenting, handContext.enabled], ([isPresenting, enabled]) => {
    if (isPresenting && enabled) {
      start()
    } else {
      stop()
    }
  })
}

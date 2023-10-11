import { watch } from '@threlte/core'
import { useXR } from '../../hooks/useXR'
import { useFixed } from '../../internal/useFixed'
import type { Context, HandContext } from './types'

export const setupTeleportControls = (context: Context, handContext: HandContext) => {
  const xrState = useXR()

  const { start, stop } = useFixed(() => {
    context.compute(context, handContext)

    const [intersect] = context.raycaster.intersectObjects(context.interactiveObjects, true)
    
    if (intersect === undefined) return

    if (context.blockers.has(intersect.object.uuid)) {
      return
    }

    handContext.hovered.set(intersect)
  }, {
    fixedStep: 1 / 24,
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

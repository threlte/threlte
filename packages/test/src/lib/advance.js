/**
 * @typedef {{
 *   count?: number,
 *   delta?: number
 * }} AdvanceOptions
 */

import { useScheduler } from '@threlte/core'

export const mockAdvanceFn = () => {
  const context = useScheduler()

  /**
   * @param {AdvanceOptions} options
   * @returns {{ frameInvalidated: boolean }}
   */
  const advance = (options = {}) => {
    const { count = 1, delta = 16 } = options

    let frameInvalidated = false

    for (let index = 0; index < count; index += 1) {
      // @ts-expect-error Set last time to get precise deltas
      context.scheduler.lastTime = 0
      context.scheduler.run(delta ?? 16)
      frameInvalidated = context.shouldRender()
      context.frameInvalidated.current = false
    }

    return { frameInvalidated }
  }

  return advance
}

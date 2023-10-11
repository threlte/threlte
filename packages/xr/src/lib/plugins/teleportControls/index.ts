import { setTeleportContext } from './context'
import type { Context } from './types'
import { injectTeleportControlsPlugin } from './plugin'

export const teleportControls = (options?: TeleportControlsOptions) => {
  injectTeleportControlsPlugin()

  const context: Context = {
    surfaces: [],
    blockers: [],
  }

  setTeleportContext(context)
}
import { setTeleportContext } from './context'
import type { Context } from './types'
import { injectTeleportControlsPlugin } from './plugin'

export type TeleportControlsOptions = {

}

export const teleportControls = (options?: TeleportControlsOptions) => {
  injectTeleportControlsPlugin()

  const context: Context = {
    surfaces: [],
    blockers: [],
    dispatchers: new WeakMap()
  }

  setTeleportContext(context)
}

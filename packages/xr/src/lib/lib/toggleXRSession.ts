import {
  lastSessionRequest,
  referenceSpaceType,
  session,
  xr
} from '../internal/state.svelte.js'
import { getXRSessionOptions } from './getXRSessionOptions.js'

let pending: Promise<XRSession | undefined> | undefined

/**
 * Starts / ends an XR session.
 *
 * @param sessionMode an XR session mode: 'inline' | 'immersive-vr' | 'immersive-ar'
 * @param sessionInit an XRSessionInit object
 * @param force Whether this button should only enter / exit an `XRSession`. Default is to toggle both ways
 * @returns
 */
export const toggleXRSession = (
  sessionMode: XRSessionMode,
  sessionInit?: XRSessionInit & { domOverlay?: { root: HTMLElement } },
  force?: 'enter' | 'exit'
): Promise<XRSession | undefined> => {
  if (pending !== undefined) return pending

  pending = run(sessionMode, sessionInit, force).finally(() => {
    pending = undefined
  })

  return pending
}

const run = async (
  sessionMode: XRSessionMode,
  sessionInit?: XRSessionInit & { domOverlay?: { root: HTMLElement } },
  force?: 'enter' | 'exit'
): Promise<XRSession | undefined> => {
  const currentSession = session.current
  const hasSession = currentSession !== undefined

  if (force === 'enter' && hasSession) return currentSession
  if (force === 'exit' && !hasSession) return

  // Exit a session if entered. `session.current` is cleared by XR.svelte's
  // `handleSessionEnd` when the 'end' event fires — don't duplicate that here.
  if (hasSession) {
    await currentSession.end()
    return
  }

  const manager = xr.current
  if (manager === undefined) {
    throw new Error('An <XR> component was not created when attempting to toggle a session.')
  }

  // Otherwise enter a session
  const options = getXRSessionOptions(referenceSpaceType.current, sessionInit)
  const nextSession = await navigator.xr!.requestSession(sessionMode, options)

  await manager.setSession(nextSession)

  lastSessionRequest.mode = sessionMode
  lastSessionRequest.sessionInit = sessionInit
  session.current = nextSession
  return nextSession
}

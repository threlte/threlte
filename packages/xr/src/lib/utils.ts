import { session, referenceSpaceType } from './stores'
import { get } from 'svelte/store'

/**
 * Gets the support state of requested session mode.
 * @param mode The desired session mode.
 * @returns The current support state
 */
export const getSupportState = async (mode: XRSessionMode): Promise<'unsupported' | 'insecure' | 'blocked' | 'supported'> => {
  if (navigator?.xr === undefined) {
    return 'unsupported'
  }

  if (location.protocol !== 'https:') {
    return 'insecure'
  }

  try {
    const supported = await navigator.xr.isSessionSupported(mode)
    return supported ? 'supported' : 'unsupported'
  } catch (error) {
    return (error as { name: string }).name === 'SecurityError' ? 'blocked' : 'unsupported'
  }
}

const getSessionOptions = (
  globalStateReferenceSpaceType: XRReferenceSpaceType | undefined,
  sessionInit: XRSessionInit | undefined
): XRSessionInit | undefined => {
  if (!globalStateReferenceSpaceType && !sessionInit) {
    return undefined
  }

  if (globalStateReferenceSpaceType && !sessionInit) {
    return { optionalFeatures: [globalStateReferenceSpaceType] }
  }

  if (globalStateReferenceSpaceType && sessionInit) {
    return {
      ...sessionInit,
      optionalFeatures: [
        ...new Set([...(sessionInit.optionalFeatures ?? []),
        globalStateReferenceSpaceType])
      ]
    }
  }

  return sessionInit
}

/**
 * Starts / ends an XR session.
 *
 * @param sessionMode an XR session mode: 'inline' | 'immersive-vr' | 'immersive-ar'
 * @param sessionInit an XRSessionInit object
 * @param force Whether this button should only enter / exit an `XRSession`. Default is to toggle both ways
 * @returns 
 */
export const toggleSession = async (
  sessionMode: XRSessionMode,
  sessionInit?: (XRSessionInit & { domOverlay?: { root: HTMLElement } | undefined }) | undefined,
  force?: 'enter' | 'exit'
): Promise<XRSession | undefined> => {
  const currentSession = get(session)
  const hasSession = get(session) !== undefined

  if (force === 'enter' && hasSession) return currentSession
  if (force === 'exit' && !hasSession) return

  // Exit / enter session
  if (currentSession !== undefined) {
    await currentSession.end()
    session.set(undefined)
    return
  } else {
    const options = getSessionOptions(get(referenceSpaceType), sessionInit)
    const nextSession = await navigator.xr!.requestSession(sessionMode, options)
    session.set(nextSession)
    return nextSession
  }
}

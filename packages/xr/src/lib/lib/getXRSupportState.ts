/**
 * Gets the support state of requested session mode.
 * @param mode Session mode: 'inline' | 'immersive-vr' | 'immersive-ar'
 * @returns The current support state
 */
export const getXRSupportState = async (
  mode: XRSessionMode
): Promise<'unsupported' | 'insecure' | 'blocked' | 'supported'> => {
  if (navigator?.xr === undefined) {
    return 'unsupported'
  }

  if (!window.isSecureContext) {
    return 'insecure'
  }

  try {
    const supported = await navigator.xr.isSessionSupported(mode)
    return supported ? 'supported' : 'unsupported'
  } catch (error) {
    return (error as { name: string }).name === 'SecurityError' ? 'blocked' : 'unsupported'
  }
}

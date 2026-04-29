export const getXRSessionOptions = (
  referenceSpaceType?: XRReferenceSpaceType,
  sessionInit?: XRSessionInit,
  fallbackSessionInit?: XRSessionInit
): XRSessionInit | undefined => {
  const init = sessionInit ?? fallbackSessionInit

  if (referenceSpaceType === undefined && init === undefined) {
    return undefined
  }

  if (referenceSpaceType && init === undefined) {
    return { optionalFeatures: [referenceSpaceType] }
  }

  if (referenceSpaceType && init) {
    return {
      ...init,
      optionalFeatures: [...new Set([...(init.optionalFeatures ?? []), referenceSpaceType])]
    }
  }

  return init
}

export const getXRSessionOptions = (
  referenceSpaceType?: XRReferenceSpaceType,
  sessionInit?: XRSessionInit
): XRSessionInit | undefined => {
  if (referenceSpaceType === undefined && sessionInit === undefined) {
    return undefined
  }

  if (referenceSpaceType && sessionInit === undefined) {
    return { optionalFeatures: [referenceSpaceType] }
  }

  if (referenceSpaceType && sessionInit) {
    return {
      ...sessionInit,
      optionalFeatures: [...new Set([...(sessionInit.optionalFeatures ?? []), referenceSpaceType])]
    }
  }

  return sessionInit
}

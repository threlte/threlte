let allAppModules = undefined as Record<string, () => Promise<any>> | undefined

export const getAllAppModules = () => {
  if (allAppModules) {
    return allAppModules
  }
  allAppModules = import.meta.glob('../../../examples/**/App.svelte') as Record<
    string,
    () => Promise<any>
  >
  return allAppModules
}

let allModules = undefined as Record<string, string> | undefined

export const getAllExamplesModules = () => {
  if (allModules) return allModules
  allModules = import.meta.glob('../../examples/**/*', {
    query: '?raw',
    eager: true,
    import: 'default'
  }) as Record<string, string>
  return allModules
}

let allAppModules = undefined as Record<string, () => Promise<any>> | undefined

export const getAllAppModules = () => {
  if (allAppModules) return allAppModules
  allAppModules = import.meta.glob('../../examples/**/App.svelte') as Record<
    string,
    () => Promise<any>
  >
  return allAppModules
}

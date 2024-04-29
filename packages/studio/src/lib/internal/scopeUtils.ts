export const scopeId = (scope: string, key: string) => `${scope}:${key}`

export const unscopeId = (scopedId: string): { scope: string; id: string } => {
  const [scope, id] = scopedId.split(':')
  return { scope, id }
}

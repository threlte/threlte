export const scopeId = (namespace: string, scope: string, key: string) =>
  `${namespace}/${scope}:${key}`

export const unscopeId = (scopedId: string): { scope: string; id: string } => {
  const [scope, id] = scopedId.split(':')
  return { scope, id }
}

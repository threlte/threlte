export const inspectorScope = 'inspector'

export type InspectorState = {
  enabled: boolean
}

export type InspectorActions = {
  toggleEnabled: () => void
  setEnabled: (enabled: boolean) => void
}

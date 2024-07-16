export const sceneHierarchyScope = 'scene-hierarchy'

export type SceneHierarchyState = {
  enabled: boolean
}

export type SceneHierarchyActions = {
  setEnabled: (enabled: boolean) => void
  toggleEnabled: () => void
}

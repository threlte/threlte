export const staticStateScope = 'static-state'

export type StaticState = {
  editorEnabled: boolean
}

export type StaticStateActions = {
  toggleEditorEnabled: () => void
}

export const staticStateScope = 'static-state'

export type StaticStateState = {
  editorEnabled: boolean
}

export type StaticStateActions = {
  enableEditor: () => void
  disableEditor: () => void
  toggleEditor: () => void
}

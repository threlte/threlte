import type { Camera } from 'three'

export const editorCameraScope = 'editor-camera'

export type EditorCameraState = {
  enabled: boolean
  mode: 'Orthographic' | 'Perspective'
  position: [x: number, y: number, z: number]
  target: [x: number, y: number, z: number]
  defaultCamera: {
    object: Camera | undefined
    enabled: boolean
    width: number
    height: number
  }
}

export type EditorCameraActions = {
  toggleEnabled: () => void
  setEnabled: (enabled: boolean) => void
  toggleMode: () => void
  setMode: (mode: EditorCameraState['mode']) => void
  setEditorCameraTransform: (
    position: EditorCameraState['position'],
    target: EditorCameraState['target']
  ) => void
  setPerspective: () => void
  setOrthographic: () => void
  toggleDefaultCameraEnabled: () => void
  setDefaultCameraEnabled: (enabled: boolean) => void
  setDefaultCameraObject: (object: Camera | undefined) => void
  focusSelectedObjects: () => void
}

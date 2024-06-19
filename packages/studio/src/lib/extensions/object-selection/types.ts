import type { Object3D } from 'three'

export const objectSelectionScope = 'object-selection'

export type ObjectSelectionState = {
  selectedObjects: Object3D[]
  enabled: boolean
  mode: 'tweak' | 'rect'
  inUse: boolean
}

export type ObjectSelectionActions = {
  selectObjects: (objects: Object3D[]) => void
  addToSelection: (objects: Object3D[]) => void
  removeFromSelection: (objects: Object3D[]) => void
  toggleSelection: (objects: Object3D[]) => void
  clearSelection: () => void
  toggleEnabled: () => void
  setEnabled: (enabled: boolean) => void
  setMode: (mode: 'tweak' | 'rect') => void
  setModeTweak: () => void
  setModeRect: () => void
  toggleMode: () => void
  setInUse: (inUse: boolean) => void
}

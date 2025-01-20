export const snappingScope = 'snapping'

export type SnappingState = {
  enabled: boolean
  translate: number
  rotate: number
  scale: number
}

export type SnappingActions = {
  setEnabled: (enabled: boolean) => void
  toggleEnabled: () => void
  setTranslate: (translate: number) => void
  setRotate: (rotate: number) => void
  setScale: (scale: number) => void
}

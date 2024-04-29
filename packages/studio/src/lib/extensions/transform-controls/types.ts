export const transformControlsScope = 'transform-controls'

export type TransformControlsState = {
  enabled: boolean
  mode: 'translate' | 'rotate' | 'scale'
  inUse: boolean
}

export type TransformControlsActions = {
  enable: () => void
  disable: () => void
  toggle: () => void
  setMode: (mode: 'translate' | 'rotate' | 'scale') => void
  translate: () => void
  rotate: () => void
  scale: () => void
  setInUse: (inUse: boolean) => void
}

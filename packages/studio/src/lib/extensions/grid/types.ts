export const gridScope = 'grid'

export type GridState = {
  enabled: boolean
  color: string
  step: number
  plane: 'xy' | 'xz' | 'zy'
}

export type GridActions = {
  toggleEnabled: () => void
  setEnabled: (enabled: boolean) => void
  setColor: (color: string) => void
  setStep: (step: number) => void
  setPlane: (plane: 'xy' | 'xz' | 'zy') => void
}

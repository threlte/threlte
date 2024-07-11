export const renderModesScope = 'render-modes'

export type RenderModesState = {
  renderMode: 'rendered' | 'wireframe' | 'solid'
}

export type RenderModesActions = {
  cycleRenderMode: () => void
  setRenderMode: (mode: RenderModesState['renderMode']) => void
}

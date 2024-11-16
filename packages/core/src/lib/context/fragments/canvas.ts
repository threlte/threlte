import { getContext, setContext } from 'svelte'

type CanvasContext = {
  /** The canvas element */
  canvas: HTMLCanvasElement
}

export type CreateCanvasContextOptions = {
  canvas: HTMLCanvasElement
}

export const createCanvasContext = (options: CreateCanvasContextOptions) => {
  const context: CanvasContext = {
    canvas: options.canvas
  }

  setContext<CanvasContext>('threlte-canvas-context', context)

  return context
}

export const useCanvas = (): CanvasContext => {
  const context = getContext<CanvasContext>('threlte-canvas-context')

  if (!context) {
    throw new Error('useCanvas can only be used in a child component to <Canvas>.')
  }

  return context
}

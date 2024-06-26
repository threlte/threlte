import { getContext, setContext } from 'svelte'
import { readable, type Readable } from 'svelte/store'

export type Size = {
  width: number
  height: number
}

type CanvasContext = {
  /** The canvas wrapper element */
  wrapper: HTMLDivElement
  /** The canvas element */
  canvas: HTMLCanvasElement
  /** The canvas size */
  size: Readable<Size>
}

export type CreateCanvasContextOptions = {
  wrapper: HTMLDivElement
  canvas: HTMLCanvasElement
}

export const createCanvasContext = (options: CreateCanvasContextOptions) => {
  const wrapperRect = options.wrapper.getBoundingClientRect()

  let lastWidth = wrapperRect.width
  let lastHeight = wrapperRect.height

  const context: CanvasContext = {
    wrapper: options.wrapper,
    canvas: options.canvas,
    size: readable({ width: wrapperRect.width, height: wrapperRect.height }, (set) => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          if (width === lastWidth && height === lastHeight) return
          lastWidth = width
          lastHeight = height
          set({ width, height })
        }
      })

      resizeObserver.observe(options.wrapper)

      return () => {
        resizeObserver.disconnect()
      }
    })
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

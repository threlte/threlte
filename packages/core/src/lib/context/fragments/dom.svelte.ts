import { getContext, setContext } from 'svelte'
import { runeToCurrentReadable, type CurrentReadable } from '../../utilities/currentWritable.js'

export interface DOMContext {
  /** The canvas wrapper element */
  dom: HTMLElement
  canvas: HTMLCanvasElement
  size: CurrentReadable<{ width: number; height: number }>
}

export type CreateDOMContextOptions = {
  dom: HTMLElement
  canvas: HTMLCanvasElement
}

export const createDOMContext = (options: () => CreateDOMContextOptions) => {
  const { dom, canvas } = options()

  let size = $state.raw({
    width: dom.offsetWidth,
    height: dom.offsetHeight
  })

  const resizeObserver = new ResizeObserver(() => {
    const { offsetWidth, offsetHeight } = dom
    if (size.width !== offsetWidth || size.height !== offsetHeight) {
      size = { width: offsetWidth, height: offsetHeight }
    }
  })

  $effect(() => {
    resizeObserver.observe(dom)

    return () => {
      resizeObserver.disconnect()
    }
  })

  const context: DOMContext = {
    dom,
    canvas,
    size: runeToCurrentReadable(() => size)
  }

  setContext<DOMContext>('threlte-dom-context', context)

  return context
}

export const useDOM = (): DOMContext => {
  const context = getContext<DOMContext>('threlte-dom-context')

  if (!context) {
    throw new Error('useDOM can only be used in a child component to <Canvas>.')
  }

  return context
}

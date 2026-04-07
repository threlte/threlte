import { getContext, setContext } from 'svelte'
import { runeToCurrentReadable, type CurrentReadable } from '../../utilities/currentWritable.js'
import { useMeasure } from '../../utilities/useMeasure.svelte.js'

export interface DOMContext {
  /** The canvas wrapper element */
  dom: HTMLElement
  canvas: HTMLCanvasElement
  size: CurrentReadable<{ width: number; height: number }>
  shouldUpdateSize: () => boolean
}

export type CreateDOMContextOptions = {
  dom: HTMLElement
  canvas: HTMLCanvasElement
}

export const createDOMContext = (
  options: CreateDOMContextOptions | (() => CreateDOMContextOptions)
) => {
  const opts = typeof options === 'function' ? options() : options
  const { dom, canvas } = opts

  const { size, shouldUpdateSize } = useMeasure(dom)

  const context: DOMContext = {
    dom,
    canvas,
    size: runeToCurrentReadable(() => size.current),
    shouldUpdateSize
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

import { getContext, onMount, setContext } from 'svelte'
import {
  currentWritable,
  toCurrentReadable,
  type CurrentReadable,
  type CurrentWritable
} from '../../utilities'

type DOMContext = {
  /** The canvas wrapper element */
  dom: HTMLElement
  canvas: HTMLCanvasElement
  size: CurrentReadable<DOMRect>
}

export type CreateDOMContextOptions = {
  dom: HTMLElement
  canvas: HTMLCanvasElement
}

export const createDOMContext = (options: CreateDOMContextOptions) => {
  const { dom, canvas } = options
  const size = currentWritable<DOMRect | undefined>(undefined)

  onMount(() => {
    size.set(dom.getBoundingClientRect())

    const resizeObserver = new ResizeObserver(() => {
      size.set(dom.getBoundingClientRect())
    })

    resizeObserver.observe(dom)

    return () => {
      resizeObserver.disconnect()
    }
  })

  const context: DOMContext = {
    dom,
    canvas,
    size: toCurrentReadable(size as CurrentWritable<DOMRect>)
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

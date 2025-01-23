import { getContext, onMount, setContext } from 'svelte'
import { currentWritable, toCurrentReadable, type CurrentReadable } from '../../utilities'

type DOMContext = {
  /** The canvas wrapper element */
  dom: HTMLElement
  canvas: HTMLCanvasElement
  size: CurrentReadable<DOMRect>
}

export type CreateDOMContextOptions = {
  dom: HTMLElement
  canvas: HTMLCanvasElement
  offsetSize: boolean
}

export const createDOMContext = (options: CreateDOMContextOptions) => {
  const { dom, canvas, offsetSize } = options

  const size = currentWritable(dom.getBoundingClientRect())

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (offsetSize) {
        size.set(dom.getBoundingClientRect())
        size.current.width = dom.offsetWidth
        size.current.height = dom.offsetHeight
      } else {
        size.set(dom.getBoundingClientRect())
      }
    })

    resizeObserver.observe(dom)

    return () => {
      resizeObserver.disconnect()
    }
  })

  const context: DOMContext = {
    dom,
    canvas,
    size: toCurrentReadable(size)
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

import { getContext, onMount, setContext } from 'svelte'
import { currentWritable, toCurrentReadable, type CurrentReadable } from '../../utilities'

export type Size = {
  width: number
  height: number
}

type DOMContext = {
  /** The canvas wrapper element */
  dom: HTMLElement
  size: CurrentReadable<Size>
}

export type CreateDOMContextOptions = {
  dom: HTMLElement
}

export const createDOMContext = (options: CreateDOMContextOptions) => {
  const domRect = options.dom.getBoundingClientRect()

  let lastWidth = domRect.width
  let lastHeight = domRect.height

  const size = currentWritable({ width: domRect.width, height: domRect.height })

  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width === lastWidth && height === lastHeight) return
        lastWidth = width
        lastHeight = height
        size.set({ width, height })
      }
    })

    resizeObserver.observe(options.dom)

    return () => {
      resizeObserver.disconnect()
    }
  })

  const context: DOMContext = {
    dom: options.dom,
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

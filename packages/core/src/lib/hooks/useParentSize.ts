import { onDestroy } from 'svelte'
import { currentWritable, type CurrentWritable } from '../lib/storeUtils'
import { browser } from '../lib/browser'
import type { Size } from '../types'

export const useParentSize = (): {
  parentSizeAction: (node: HTMLElement) => void
  parentSize: CurrentWritable<Size>
} => {
  const parentSize = currentWritable<Size>({ width: 0, height: 0, left: 0, top: 0 })

  if (!browser) {
    return {
      parentSize,
      parentSizeAction: () => {
        /* do nothing */
      }
    }
  }

  // Only observe childList changes of the parent
  const mutationOptions = { childList: true, subtree: false, attributes: false }

  let el: HTMLElement | undefined

  const observeParent = (parent: HTMLElement) => {
    resizeObserver.disconnect()
    mutationObserver.disconnect()
    resizeObserver.observe(parent)
    mutationObserver.observe(parent, mutationOptions)
  }

  // The canvas should match the contentRect of its parent
  const resizeObserver = new ResizeObserver(([entry]) => {
    const { width, height, top, left } = entry.contentRect

    if (width === parentSize.current.width && height === parentSize.current.height) return

    parentSize.set({ width, height, top, left })
  })

  // Use a mutation observer to detect reparenting
  const mutationObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.removedNodes) {
        if (el === node && el.parentElement) {
          observeParent(el.parentElement)
          return
        }
      }
    }
  })

  const parentSizeAction = (node: HTMLElement) => {
    el = node

    const parent = el.parentElement

    if (!parent) return

    const {width, height, top, left } = parent.getBoundingClientRect()

    parentSize.set({ width, height, top, left })

    observeParent(parent)
  }

  onDestroy(() => {
    resizeObserver.disconnect()
    mutationObserver.disconnect()
  })

  return {
    parentSize,
    parentSizeAction
  }
}

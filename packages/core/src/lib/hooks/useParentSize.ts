import { onDestroy } from 'svelte'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '../lib/browser'
import type { Size } from '../types'

export const useParentSize = (): {
  parentSizeAction: (node: HTMLElement) => void
  parentSize: Writable<Size>
} => {
  const parentSize = writable({ width: 0, height: 0 })

  if (!browser) {
    return {
      parentSize,
      parentSizeAction: () => { /* do nothing */ }
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
    const { contentRect } = entry

    parentSize.update((value) => {
      value.width = contentRect.width
      value.height = contentRect.height
      return value
    })
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
    if (!el.parentElement) return
    observeParent(el.parentElement)
  }

  onDestroy(() => {
    resizeObserver.disconnect()
    mutationObserver.disconnect()
  })

  return {
    parentSize,
    parentSizeAction,
  }
}

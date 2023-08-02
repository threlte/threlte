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

  const resizeObserver = new ResizeObserver(([entry]) => {
    const { contentRect } = entry

    parentSize.update((value) => {
      value.width = contentRect.width
      value.height = contentRect.height
      return value
    })
  })

  const parentSizeAction = (node: HTMLElement) => {
    if (!node.parentElement) return
    resizeObserver.disconnect()
    resizeObserver.observe(node.parentElement)
  }

  onDestroy(() => resizeObserver.disconnect())

  return {
    parentSize,
    parentSizeAction,
  }
}

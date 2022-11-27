import { onDestroy } from 'svelte'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '../lib/browser'
import type { Size } from '../types/types'

export const useParentSize = (): {
  parentSizeAction: (node: HTMLElement) => void
  parentSize: Writable<Size>
} => {
  const parentSizeStore = writable({ width: 0, height: 0 })
  let parentSize = { width: 0, height: 0 }
  const unsubscribeParentSize = parentSizeStore.subscribe((s) => (parentSize = s))
  onDestroy(unsubscribeParentSize)

  let el: HTMLElement | undefined
  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    parentSizeStore.set({
      width: entry.contentRect.width,
      height: entry.contentRect.height
    })
  })

  const proxy = () => {
    if (!el) return
    if (!el.parentElement) return
    resizeObserver.observe(el.parentElement)
  }

  const parentSizeAction = (node: HTMLElement) => {
    el = node
    proxy()
  }

  if (!browser) {
    return {
      parentSize: parentSizeStore,
      parentSizeAction
    }
  }

  onDestroy(() => {
    unsubscribeParentSize()
		resizeObserver.disconnect()
  })

  return {
    parentSizeAction,
    parentSize: parentSizeStore
  }
}

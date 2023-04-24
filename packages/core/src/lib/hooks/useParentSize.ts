import { onDestroy } from 'svelte'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '../lib/browser'
import type { Size } from '../types'

export const useParentSize = (): {
  parentSizeAction: (node: HTMLElement) => void
  parentSize: Writable<Size>
} => {
  const parentSizeStore = writable({ width: 0, height: 0 })
  let parentSize = { width: 0, height: 0 }
  const unsubscribeParentSize = parentSizeStore.subscribe((s) => (parentSize = s))
  onDestroy(unsubscribeParentSize)

  let el: HTMLElement | undefined

  const proxy = () => {
    const currentParentSize = parentSize
    if (!el) return
    if (!el.parentElement) return
    const { clientWidth, clientHeight } = el.parentElement
    if (clientWidth !== currentParentSize.width || clientHeight !== currentParentSize.height) {
      parentSizeStore.set({
        width: clientWidth,
        height: clientHeight
      })
    }
  }

  const parentSizeAction = (node: HTMLElement) => {
    el = node
    proxy()
    window.addEventListener('resize', proxy)
  }

  if (!browser) {
    return {
      parentSize: parentSizeStore,
      parentSizeAction
    }
  }

  onDestroy(() => {
    window.removeEventListener('resize', proxy)
  })

  return {
    parentSizeAction,
    parentSize: parentSizeStore
  }
}

import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Size } from '../types/types'
import { browser } from '../lib/browser'

export const useParentSize = (): {
  parentSizeAction: (node: HTMLElement) => void
  parentSize: Writable<Size>
} => {
  const parentSize = writable({ width: 0, height: 0 })

  let el: HTMLElement | undefined

  const proxy = () => {
    parentSize.update((s) => {
      if (!el) return s
      if (!el.parentElement) return s
      s.width = el.parentElement.clientWidth
      s.height = el.parentElement.clientHeight
      return s
    })
  }

  const parentSizeAction = (node: HTMLElement) => {
    el = node
    proxy()
    window.addEventListener('resize', proxy)
  }

  if (!browser) {
    return {
      parentSize,
      parentSizeAction
    }
  }

  onDestroy(() => {
    window.removeEventListener('resize', proxy)
  })

  return {
    parentSizeAction,
    parentSize
  }
}

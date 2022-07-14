import { browser } from '$app/env'
import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'

export const useWindowScroll = (options?: boolean | AddEventListenerOptions) => {
  const x = writable(0)
  const y = writable(0)
  const xNormalized = writable(0)
  const yNormalized = writable(0)

  if (!browser) {
    return {
      x,
      y,
      yNormalized,
      xNormalized
    }
  }

  let windowHeight = window.innerHeight
  let windowWidth = window.innerWidth

  const onScroll = () => {
    x.set(window.scrollX)
    y.set(window.scrollY)
    yNormalized.set(window.scrollY / Math.max(document.body.clientHeight - windowHeight, 0))
    xNormalized.set(window.scrollX / Math.max(document.body.clientWidth - windowWidth, 0))
  }

  const onResize = () => {
    windowHeight = window.innerHeight
    windowWidth = window.innerWidth
  }

  window.addEventListener('scroll', onScroll, options)
  window.addEventListener('resize', onResize)

  onDestroy(() => {
    window.removeEventListener('scroll', onScroll, options)
    window.removeEventListener('resize', onResize)
  })

  return {
    x,
    y,
    yNormalized,
    xNormalized
  }
}

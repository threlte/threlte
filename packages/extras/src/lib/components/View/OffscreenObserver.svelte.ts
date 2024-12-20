import { observe } from '@threlte/core'
import { untrack } from 'svelte'

export class OffscreenObserver {
  isOffscreen = $state(false)

  constructor(getElement: () => HTMLElement) {
    observe(
      () => [getElement()],
      ([element]) => {
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            untrack(() => {
              this.isOffscreen = !entry.isIntersecting
            })
          }
        })

        observer.observe(element)
      }
    )
  }
}

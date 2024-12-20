import { observe } from '@threlte/core'

export class OffscreenObserver {
  isOffscreen = $state(false)

  constructor(getElement: () => HTMLElement) {
    observe(
      () => [getElement()],
      ([element]) => {
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            this.isOffscreen = !entry.isIntersecting
          }
        })

        observer.observe(element)

        return () => {
          observer.disconnect()
        }
      }
    )
  }
}

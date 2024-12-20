import { DefaultLoadingManager } from 'three'
import { untrack } from 'svelte'

export class Progress {
  url: null | string = $state(null)
  active = $derived(this.url !== null)
  loaded = $state(0)
  total = $state(0)
  errors: string[] = $state([])
  #previousLoaded = $state(0)
  progress = $derived.by(() => {
    let progress = 0
    const diff = (this.loaded - this.#previousLoaded) / (this.total - this.#previousLoaded)
    if (diff !== Infinity) {
      // if nothing is loaded, progress = 0
      progress = diff
    }
    return progress
  })
  finishedOnce = $derived.by(() => {
    if (untrack(() => this.progress) >= 1) {
      return true
    }
    this.progress
    return false
  })

  constructor(manager = DefaultLoadingManager) {
    const { onError, onLoad, onProgress, onStart } = manager

    manager.onStart = (url, loaded, total) => {
      onStart?.(url, loaded, total)
      this.url = url
      this.loaded = loaded
      this.total = total
    }

    manager.onProgress = (url, loaded, total) => {
      onProgress(url, loaded, total)
      if (this.loaded === this.total) {
        this.#previousLoaded = this.total
      }
      this.loaded = loaded
      this.total = total
    }

    manager.onLoad = () => {
      onLoad()
      this.url = null
    }

    manager.onError = (url) => {
      onError(url)
      this.errors.push(url)
    }
  }
}

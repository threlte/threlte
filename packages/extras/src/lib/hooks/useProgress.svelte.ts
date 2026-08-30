import { untrack } from 'svelte'
import { DefaultLoadingManager } from 'three'

let previousTotalLoaded = 0

const errors = $state<string[]>([])

let finishedOnce = $state(false)
let active = $state(false)
let item = $state<string>()
let loaded = $state<number>(0)
let total = $state<number>(0)
let progress = $state<number>(0)

const { onStart, onLoad, onError, onProgress } = DefaultLoadingManager

DefaultLoadingManager.onStart = (url: string, _loaded: number, _total: number) => {
  onStart?.(url, _loaded, _total)

  untrack(() => {
    active = true
    item = url
    loaded = _loaded
    total = _total
    progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded)

    if (progress === 1) {
      finishedOnce = true
    }
  })
}

DefaultLoadingManager.onLoad = () => {
  onLoad?.()

  untrack(() => {
    active = false
  })
}

DefaultLoadingManager.onError = (url: string) => {
  onError?.(url)

  untrack(() => {
    errors.push(url)
  })
}

DefaultLoadingManager.onProgress = (url: string, _loaded: number, _total: number) => {
  onProgress?.(url, _loaded, _total)

  untrack(() => {
    if (loaded === total) {
      previousTotalLoaded = total
    }

    active = true
    item = url
    loaded = _loaded
    total = _total
    progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded) || 1

    if (progress === 1) {
      finishedOnce = true
    }
  })
}

const states = {
  active: {
    get current() {
      return active
    }
  },
  item: {
    get current() {
      return item
    }
  },
  loaded: {
    get current() {
      return loaded
    }
  },
  total: {
    get current() {
      return total
    }
  },
  errors: {
    get current() {
      return errors
    }
  },
  progress: {
    get current() {
      return progress
    }
  },
  finishedOnce: {
    get current() {
      return finishedOnce
    }
  }
}

export const useProgress = (): {
  active: { current: boolean }
  item: { current: string | undefined }
  loaded: { current: number }
  total: { current: number }
  errors: { current: string[] }
  progress: { current: number }
  finishedOnce: { current: boolean }
} => {
  return states
}

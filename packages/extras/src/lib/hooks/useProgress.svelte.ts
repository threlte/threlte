import { DefaultLoadingManager } from 'three'

let previousTotalLoaded = 0

class LoadingState {
  finishedOnce = $state(false)
  active = $state(false)
  item = $state<string>()
  loaded = $state(0)
  total = $state(0)
  errors = $state<string[]>([])
  progress = $state(0)
}

const loadingState = new LoadingState()

const { onStart, onLoad, onError } = DefaultLoadingManager

DefaultLoadingManager.onStart = (url: string, loaded: number, total: number) => {
  onStart?.(url, loaded, total)

  loadingState.active = true
  loadingState.item = url
  loadingState.loaded = loaded
  loadingState.total = total

  const progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded)
  loadingState.progress = progress

  if (progress === 1) {
    loadingState.finishedOnce = true
  }
}

DefaultLoadingManager.onLoad = () => {
  onLoad?.()

  loadingState.active = false
}

DefaultLoadingManager.onError = (url: string) => {
  onError?.(url)
  loadingState.errors.push(url)
}

DefaultLoadingManager.onProgress = (url: string, loaded: number, total: number) => {
  if (loaded === total) {
    previousTotalLoaded = total
  }
  loadingState.active = true
  loadingState.item = url
  loadingState.loaded = loaded
  loadingState.total = total

  const progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded) || 1
  loadingState.progress = progress

  if (progress === 1) {
    loadingState.finishedOnce = true
  }
}

const progressObject = {
  active: {
    get current() {
      return loadingState.active
    }
  },
  item: {
    get current() {
      return loadingState.item
    }
  },
  loaded: {
    get current() {
      return loadingState.loaded
    }
  },
  total: {
    get current() {
      return loadingState.total
    }
  },
  errors: {
    get current() {
      return loadingState.errors
    }
  },
  progress: {
    get current() {
      return loadingState.progress
    }
  },
  finishedOnce: {
    get current() {
      return loadingState.finishedOnce
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
  return progressObject
}

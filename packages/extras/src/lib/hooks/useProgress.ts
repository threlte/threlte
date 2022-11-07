import { writable, type Readable } from 'svelte/store'
import { DefaultLoadingManager } from 'three'

let previousTotalLoaded = 0

export const useProgress = (): {
  finishedOnce: Readable<boolean>
  active: Readable<boolean>
  item: Readable<string | undefined>
  loaded: Readable<number>
  total: Readable<number>
  errors: Readable<string[]>
  progress: Readable<number>
} => {
  const finishedOnce = writable(false)
  const activeStore = writable(false)
  const itemStore = writable<string | undefined>(undefined)
  const loadedStore = writable<number>(0)
  const totalStore = writable<number>(0)
  const errorsStore = writable<string[]>([])
  const progressStore = writable<number>(0)

  DefaultLoadingManager.onStart = (item, loaded, total) => {
    activeStore.set(true)
    itemStore.set(item)
    loadedStore.set(loaded)
    totalStore.set(total)
    const progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded)
    progressStore.set(progress)
    if (progress === 1) finishedOnce.set(true)
  }
  DefaultLoadingManager.onLoad = () => {
    activeStore.set(false)
  }
  DefaultLoadingManager.onError = (item) => {
    errorsStore.update((errors) => {
      return [...errors, item]
    })
  }
  DefaultLoadingManager.onProgress = (item, loaded, total) => {
    if (loaded === total) {
      previousTotalLoaded = total
    }
    activeStore.set(true)
    itemStore.set(item)
    loadedStore.set(loaded)
    totalStore.set(total)
    const progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded) || 1
    progressStore.set(progress)
    if (progress === 1) finishedOnce.set(true)
  }

  return {
    active: { subscribe: activeStore.subscribe },
    item: { subscribe: itemStore.subscribe },
    loaded: { subscribe: loadedStore.subscribe },
    total: { subscribe: totalStore.subscribe },
    errors: { subscribe: errorsStore.subscribe },
    progress: { subscribe: progressStore.subscribe },
    finishedOnce: { subscribe: finishedOnce.subscribe }
  }
}

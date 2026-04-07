import { currentWritable } from '@threlte/core'
import { DefaultLoadingManager } from 'three'
import { fromStore } from 'svelte/store'

let previousTotalLoaded = 0

const finishedOnce = currentWritable(false)
const activeStore = currentWritable(false)
const itemStore = currentWritable<string | undefined>(undefined)
const loadedStore = currentWritable<number>(0)
const totalStore = currentWritable<number>(0)
const errorsStore = currentWritable<string[]>([])
const progressStore = currentWritable<number>(0)

const { onStart, onLoad, onError } = DefaultLoadingManager

DefaultLoadingManager.onStart = (url: string, loaded: number, total: number) => {
  onStart?.(url, loaded, total)
  activeStore.set(true)
  itemStore.set(url)
  loadedStore.set(loaded)
  totalStore.set(total)
  const progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded)
  progressStore.set(progress)
  if (progress === 1) finishedOnce.set(true)
}

DefaultLoadingManager.onLoad = () => {
  onLoad?.()
  activeStore.set(false)
}

DefaultLoadingManager.onError = (url: string) => {
  onError?.(url)
  errorsStore.update((errors) => {
    return [...errors, url]
  })
}

DefaultLoadingManager.onProgress = (url: string, loaded: number, total: number) => {
  if (loaded === total) {
    previousTotalLoaded = total
  }
  activeStore.set(true)
  itemStore.set(url)
  loadedStore.set(loaded)
  totalStore.set(total)
  const progress = (loaded - previousTotalLoaded) / (total - previousTotalLoaded) || 1
  progressStore.set(progress)
  if (progress === 1) finishedOnce.set(true)
}

const stores = {
  active: fromStore(activeStore),
  item: fromStore(itemStore),
  loaded: fromStore(loadedStore),
  total: fromStore(totalStore),
  errors: fromStore(errorsStore),
  progress: fromStore(progressStore),
  finishedOnce: fromStore(finishedOnce)
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
  return stores
}

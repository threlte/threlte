import { currentWritable } from '@threlte/core'
import { DefaultLoadingManager } from 'three'
import { type CurrentReadable, toCurrentReadable } from '../lib/storeUtils.js'

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
  active: toCurrentReadable(activeStore),
  item: toCurrentReadable(itemStore),
  loaded: toCurrentReadable(loadedStore),
  total: toCurrentReadable(totalStore),
  errors: toCurrentReadable(errorsStore),
  progress: toCurrentReadable(progressStore),
  finishedOnce: toCurrentReadable(finishedOnce)
}

export const useProgress = (): {
  active: CurrentReadable<boolean>
  item: CurrentReadable<string | undefined>
  loaded: CurrentReadable<number>
  total: CurrentReadable<number>
  errors: CurrentReadable<string[]>
  progress: CurrentReadable<number>
  finishedOnce: CurrentReadable<boolean>
} => {
  return stores
}

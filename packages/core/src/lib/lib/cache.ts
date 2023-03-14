/**
 * @file This file contains the cache implementation for Threlte. The cache is
 * used to cache the return value of a promise based on the provided keys.
 */

import { getContext, setContext } from 'svelte'

type Tuple<T = any> = [T] | T[]

type Keys = Tuple<any>

type CacheItem = {
  // The promise that is being cached
  promise: Promise<any>
  // The cache keys
  keys: Keys
  // The awaited return value of the promise
  value?: any
  // The error that was potentially thrown
  error?: any
}

type Cache = CacheItem[]

export const shallowEqualArrays = (arrA: any[], arrB: any[]) => {
  if (arrA === arrB) return true
  if (!arrA || !arrB) return false
  const len = arrA.length
  if (arrB.length !== len) return false
  for (let i = 0; i < len; i++) if (arrA[i] !== arrB[i]) return false
  return true
}

export const createCache = () => {
  setContext<Cache>('threlte-cache', [])
}

export const useCache = () => {
  const cache = getContext<Cache>('threlte-cache')

  if (!cache) {
    throw new Error('No cache found. The cache can only be used in a child component to <Canvas>.')
  }

  const remember = <T>(callback: () => Promise<T>, keys: Keys): Promise<T> => {
    for (const entry of cache) {
      // Find a match
      if (shallowEqualArrays(keys, entry.keys)) {
        // If an error occurred, throw
        if (entry.error) throw entry.error
        // If a response is pending, return
        if (entry.promise) return entry.promise as Promise<T>
      }
    }

    // If no match was found, create a new entry
    const entry: CacheItem = {
      promise: callback(),
      keys,
      value: undefined
    }

    // Add the entry to the cache
    cache.push(entry)

    // Add a catch handler to the promise
    entry.promise.catch((error) => {
      // store the error
      entry.error = error
      // we don't throw here
    })

    // Return the promise
    return entry.promise
  }

  const clear = (keys: Keys) => {
    const index = cache.findIndex((entry) => shallowEqualArrays(keys, entry.keys))
    if (index !== -1) {
      cache.splice(index, 1)
    }
  }

  return {
    remember,
    clear
  }
}

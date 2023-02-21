import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'

type Config = { lifespan?: number; equal?: (a: any, b: any) => boolean }

type Tuple<T = any> = [T] | T[]

/**
 * A writable store that also has a promise property that resolves when the
 * store is set. The store is initialized with undefined.
 */
export type AsyncWritable<T> = Writable<T | undefined> & {
  promise: Promise<T>
  then: Promise<T>['then']
  catch: Promise<T>['catch']
}

const asyncWritable = <T, Fn extends () => Promise<T>>(fn: Fn): AsyncWritable<T> => {
  const store = writable<T>(undefined)
  const promise = fn()
  promise.then((result) => {
    store.set(result)
  })
  return {
    ...store,
    promise,
    then: promise.then.bind(promise),
    catch: promise.catch.bind(promise)
  }
}

type CacheItem<Keys extends Tuple<unknown>> = {
  store: AsyncWritable<unknown>
  keys: Keys
  equal?: (a: any, b: any) => boolean
  error?: any
}

type Cache = CacheItem<Tuple<unknown>>[]

export const shallowEqualArrays = (
  arrA: any[],
  arrB: any[],
  equal: (a: any, b: any) => boolean = (a: any, b: any) => a === b
) => {
  if (arrA === arrB) return true
  if (!arrA || !arrB) return false
  const len = arrA.length
  if (arrB.length !== len) return false
  for (let i = 0; i < len; i++) if (!equal(arrA[i], arrB[i])) return false
  return true
}

export const createCache = () => {
  const cache: Cache = []

  const query = <Q, Keys extends Tuple<unknown>, Fn extends (...keys: Keys) => Promise<Q>>(
    fn: Fn,
    keys: Keys,
    options: Partial<Config> = {}
  ): AsyncWritable<Q> => {
    for (const entry of cache) {
      // Find a match
      if (shallowEqualArrays(keys, entry.keys, entry.equal)) {
        // If an error occurred, throw
        if (entry.error) throw entry.error
        // If a response was successful, return
        if (entry.store) return entry.store as AsyncWritable<Q>
      }
    }

    // The request is new or has changed.
    const entry: CacheItem<Keys> = {
      keys,
      equal: options.equal,
      store: asyncWritable(() => {
        return fn(...keys)
      })
    }

    // immediately push the entry to the cache for other requests to find
    cache.push(entry)

    // remove the entry from the cache after the lifespan
    entry.store.promise
      .then(() => {
        if (options.lifespan && options.lifespan > 0) {
          setTimeout(() => {
            const index = cache.indexOf(entry)
            if (index !== -1) cache.splice(index, 1)
          }, options.lifespan)
        }
      })
      .catch((error) => {
        // store the error
        entry.error = error
        throw error
      })

    return entry.store as AsyncWritable<Q>
  }

  /**
   * Remember what a promise returns, and return the result as a store
   */
  const remember = <Q, Keys extends Tuple<unknown>, Fn extends (...keys: Keys) => Promise<Q>>(
    fn: Fn,
    keys: Keys,
    config?: Config
  ): AsyncWritable<Q> => {
    return query(fn, keys, config)
  }

  /**
   * Preload a query, but don't return the result
   */
  const preload = <Keys extends Tuple<unknown>, Fn extends (...keys: Keys) => Promise<unknown>>(
    fn: Fn,
    keys: Keys,
    config?: Config
  ) => {
    query(fn, keys, config)
  }

  const peek = <Keys extends Tuple<unknown>>(keys: Keys) => {
    cache.find((entry) => shallowEqualArrays(keys, entry.keys, entry.equal))?.store
  }

  const clear = <Keys extends Tuple<unknown>>(keys?: Keys) => {
    if (keys === undefined || keys.length === 0) cache.splice(0, cache.length)
    else {
      const entry = cache.find((entry) => shallowEqualArrays(keys, entry.keys, entry.equal))
      if (entry) {
        const index = cache.indexOf(entry)
        if (index !== -1) cache.splice(index, 1)
      }
    }
  }

  const cacheContext = {
    cache,
    remember,
    preload,
    peek,
    clear
  }

  setContext('threlte-cache', cacheContext)

  return cacheContext
}

type CacheContext = ReturnType<typeof createCache>

export const useCache = () => {
  const cache = getContext<CacheContext>('threlte-cache')
  if (!cache)
    throw new Error(
      'No cache context found, Threlte hooks can only be used within the Canvas component!'
    )
  return cache
}

import { getContext, setContext } from 'svelte'

type Keys = unknown[]

type CacheItem = {
  // The promise that is being cached
  promise: Promise<unknown>
  // The cache keys
  keys: Keys
}

type CacheContext = {
  remember: <T>(callback: () => Promise<T>, keys: Keys) => Promise<T>
  clear: (keys: Keys) => void
}

export const shallowEqualArrays = (arrA: unknown[], arrB: unknown[]) => {
  if (arrA === arrB) return true
  if (!arrA || !arrB) return false
  const len = arrA.length
  if (arrB.length !== len) return false
  for (let i = 0; i < len; i++) if (arrA[i] !== arrB[i]) return false
  return true
}

/**
 * ### `createCacheContext`
 *
 * Every Threlte application has its own cache. This prevents models from being
 * shared between applications because e.g. THREE.Mesh objects cannot be mounted
 * in multiple scenes.
 */
export const createCacheContext = () => {
  const getCacheKey = (keys: Keys) => JSON.stringify(keys)

  const items = new Map<string, CacheItem>()

  const remember: CacheContext['remember'] = <T>(
    callback: () => Promise<T>,
    keys: Keys
  ): Promise<T> => {
    const cacheKey = getCacheKey(keys)
    const existing = items.get(cacheKey)

    if (existing) {
      return existing.promise as Promise<T>
    }

    const promise = callback()

    // If the promise rejects, remove the cache entry so that retries can be made
    promise.catch((error) => {
      items.delete(cacheKey)
      throw error
    })

    // If no match was found, create a new entry
    const entry: CacheItem = {
      promise,
      keys
    }

    // Add the entry to the cache
    items.set(cacheKey, {
      promise,
      keys
    })

    // Return the promise
    return entry.promise as Promise<T>
  }

  const clear: CacheContext['clear'] = (keys) => {
    items.delete(getCacheKey(keys))
  }

  const context: CacheContext = { remember, clear }

  setContext<CacheContext>('threlte-cache', context)

  return context
}

/**
 * ### `useCache`
 *
 * This hook is used to access the cache. It returns a `remember` function that
 * can be used to cache a promise based on the provided keys. The `remember`
 * function will return the cached promise when the keys match, so repeated
 * calls share the same in-flight or resolved result.
 *
 * @example
 * ```ts
 * const { remember } = useCache()
 *
 * const asyncWritable = remember(async () => {
 *  const loader = new GLTFLoader()
 *  const { scene } = await loader.loadAsync('/path/to/model.glb')
 *  return scene
 * })
 * ```
 *
 * The model will only be loaded once, even if `remember` is invoked multiple
 * times with the same keys.
 *
 * The `clear` function can be used to clear the cache for a specific set of keys.
 */
export const useCache = (): CacheContext => {
  const cache = getContext<CacheContext>('threlte-cache')

  if (!cache) {
    throw new Error('No cache found. The cache can only be used in a child component to <Canvas>.')
  }

  return cache
}

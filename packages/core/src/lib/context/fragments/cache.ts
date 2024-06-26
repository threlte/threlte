import { getContext, setContext } from 'svelte'

type Tuple<T = unknown> = [T] | T[]

type Keys = Tuple<unknown>

type CacheItem = {
  // The promise that is being cached
  promise: Promise<unknown>
  // The cache keys
  keys: Keys
}

type Cache = CacheItem[]

type CacheContext = {
  items: Cache
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
  const items: Cache = []

  const remember: CacheContext['remember'] = <T>(
    callback: () => Promise<T>,
    keys: Keys
  ): Promise<T> => {
    for (let i = 0; i < items.length; i++) {
      const entry = items[i]
      if (shallowEqualArrays(keys, entry.keys)) {
        if (entry.promise) return entry.promise as Promise<T>
      }
    }

    // If no match was found, create a new entry
    const entry: CacheItem = {
      promise: callback(),
      keys
    }

    // Add the entry to the cache
    items.push(entry)

    // Return the promise
    return entry.promise as Promise<T>
  }

  const clear: CacheContext['clear'] = (keys) => {
    for (let i = 0; i < items.length; i++) {
      const entry = items[i]
      if (shallowEqualArrays(keys, entry.keys)) {
        items.splice(i, 1)
        return
      }
    }
  }

  const context: CacheContext = { items, remember, clear }

  setContext<CacheContext>('threlte-cache', context)

  return context
}

/**
 * ### `useCache`
 *
 * This hook is used to access the cache. It returns a `remember` function that
 * can be used to cache a promise based on the provided keys. The `remember`
 * function will return the cached value if the promise has already been
 * resolved and the keys match.
 *
 * @example
 * ```ts
 * const { remember } = useCache()
 *
 * const asnycWritable = remember(async () => {
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

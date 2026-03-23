import { getContext, setContext } from 'svelte'

type Cache = Map<string, Promise<unknown>>

interface CacheContext {
  cache: Cache
  remember: <T>(key: string, callback: () => Promise<T>) => Promise<T>
  clear: (key: string) => void
}

/**
 * ### `createCacheContext`
 *
 * Every Threlte application has its own cache. This prevents models from being
 * shared between applications because e.g. THREE.Mesh objects cannot be mounted
 * in multiple scenes.
 */
export const createCacheContext = () => {
  const cache = new Map<string, Promise<unknown>>()

  const remember = <T>(key: string, callback: () => Promise<T>): Promise<T> => {
    if (cache.has(key)) {
      return cache.get(key) as Promise<T>
    }

    // If no match was found, create a new entry
    const entry = callback()

    // Add the entry to the cache
    cache.set(key, entry)

    // Return the promise
    return entry
  }

  const clear = (key: string) => {
    cache.delete(key)
  }

  const context: CacheContext = { cache, remember, clear }

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
 * const asyncWritable = remember('myModel', async () => {
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

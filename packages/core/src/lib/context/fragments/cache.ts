import { getContext, setContext } from 'svelte'

type Cache = Map<string, unknown>

type CacheContext = {
  remember: <T>(keys: string, callback: () => Promise<T>) => Promise<T>
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
  const cache: Cache = new Map<string, unknown>()

  const remember: CacheContext['remember'] = <T>(
    key: string,
    callback: () => Promise<T>
  ): Promise<T> => {
    const entry = cache.get(key)

    if (entry) {
      return entry as Promise<T>
    }

    const promise = callback()

    // If the promise rejects, remove the cache entry so that retries can be made
    promise.catch((error) => {
      cache.delete(key)
      throw error
    })

    // If no match was found, create a new entry and add to the cache
    cache.set(key, promise)

    // Return the promise
    return promise
  }

  const clear: CacheContext['clear'] = (key: string) => {
    cache.delete(key)
  }

  const context: CacheContext = { remember, clear }

  setContext<CacheContext>('threlte-cache', context)

  return context
}

/**
 * ### `useCache`
 *
 * This hook is used to access the cache. It returns a `remember` function that
 * can be used to cache a promise based on the provided key. The `remember`
 * function will return the cached promise when the key matches, so repeated
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
 * times with the same key.
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

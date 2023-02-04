import type * as THREE from 'three'
import { useCache } from '../lib/cache'

export interface Loader<T> extends THREE.Loader {
  load(
    url: string,
    onLoad?: (result: T) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): unknown
}

export type LoaderProto<T> = new (...args: any) => Loader<T extends unknown ? any : T>
export type LoaderReturnType<T, L extends LoaderProto<T>> = T extends unknown
  ? Awaited<ReturnType<InstanceType<L>['loadAsync']>>
  : T
// TODO: this isn't used anywhere, remove in v9
export type LoaderResult<T> = T extends any[] ? Loader<T[number]> : Loader<T>
export type Extensions<T extends { prototype: LoaderProto<any> }> = (loader: T['prototype']) => void
export type ConditionalType<Child, Parent, Truthy, Falsy> = Child extends Parent ? Truthy : Falsy
export type BranchingReturn<T, Parent, Coerced> = ConditionalType<T, Parent, Coerced, T>

function loadingFn<L extends LoaderProto<any>>(
  extensions?: Extensions<L>,
  onProgress?: (event: ProgressEvent<EventTarget>) => void
) {
  return function (Proto: L, ...input: string[]) {
    // Construct new loader and run extensions
    const loader = new Proto()
    extensions?.(loader)
    // Go through the urls and load them
    return Promise.all(
      input.map(
        (input) =>
          new Promise((res, reject) =>
            loader.load(
              input,
              (data: any) => {
                res(data)
              },
              onProgress,
              (error) => reject(new Error(`Could not load ${input}: ${error.message})`))
            )
          )
      )
    )
  }
}

/**
 * Synchronously loads and caches assets with a three loader.
 *
 * Note: this hook's caller must be wrapped with `React.Suspense`
 * @see https://docs.pmnd.rs/react-three-fiber/api/hooks#useloader
 */
export function useLoader2<
  T,
  U extends string | string[],
  L extends LoaderProto<T>,
  R = LoaderReturnType<T, L>
>(
  Proto: L,
  input: U,
  extensions?: Extensions<L>,
  onProgress?: (event: ProgressEvent<EventTarget>) => void
): U extends any[] ? Promise<R[]> : Promise<R> {
  const { remember } = useCache()
  // Use suspense to load async assets
  const keys = (Array.isArray(input) ? input : [input]) as string[]

  // this will call the loadingFn with all specified keys and return the result as a Promise
  const results = remember(loadingFn<L>(extensions, onProgress), [Proto, ...keys])

  // Return the object/s
  return results as any
}

/**
 * Preloads an asset into cache as a side-effect.
 */
useLoader2.preload = function <T, U extends string | string[], L extends LoaderProto<T>>(
  Proto: L,
  input: U,
  extensions?: Extensions<L>
) {
  const { preload } = useCache()
  const keys = (Array.isArray(input) ? input : [input]) as string[]
  return preload(loadingFn<L>(extensions), [Proto, ...keys])
}

/**
 * Removes a loaded asset from cache.
 */
useLoader2.clear = function <T, U extends string | string[], L extends LoaderProto<T>>(
  Proto: L,
  input: U
) {
  const { clear } = useCache()
  const keys = (Array.isArray(input) ? input : [input]) as string[]
  return clear([Proto, ...keys])
}

import type * as THREE from 'three'
import { DefaultLoadingManager } from 'three'
import { useCache, type AsyncWritable } from '../lib/cache'

export interface Loader<T> extends THREE.Loader {
  load(
    url: string,
    onLoad?: (result: T) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: any) => void
  ): unknown
}

export type LoadOptions<T> = {
  onLoad?: (result: T) => void
  onProgress?: (event: ProgressEvent) => void
  onError?: (event: any) => void
}

export type LoaderProto<T> = new (...args: any) => Loader<T extends unknown ? any : T>
export type LoaderReturnType<T, L extends LoaderProto<T>> = T extends unknown
  ? Awaited<ReturnType<InstanceType<L>['loadAsync']>>
  : T
export type Extend<T extends { prototype: LoaderProto<any> }> = (loader: T['prototype']) => void

function loadingFn(loader: Loader<any>, input: string, options: LoadOptions<any>) {
  return new Promise((res, reject) => {
    loader.load(
      input,
      (data: any) => {
        res(data)
        options.onLoad?.(data)
      },
      options.onProgress,
      (error) => {
        options.onError?.(error)
        reject(new Error(`Could not load ${input}: ${error.message})`))
      }
    )
  })
}

export function useLoader3<
  LoaderClassDef,
  Input extends string | string[] | Record<string, string>,
  Proto extends LoaderProto<LoaderClassDef>,
  ValueType = LoaderReturnType<LoaderClassDef, Proto>,
  InputKeys extends string | number | symbol = Input extends Record<string, string>
    ? keyof Input
    : never,
  ReturnType = Input extends any[]
    ? AsyncWritable<ValueType>[]
    : Input extends string
    ? AsyncWritable<ValueType>
    : Record<InputKeys, AsyncWritable<ValueType>>
>(
  Proto: Proto,
  input: Input,
  options: LoadOptions<ValueType> & {
    extend?: Extend<Proto>
  } = {}
): ReturnType {
  const { remember } = useCache()

  const loader = new Proto()
  options.extend?.(loader)

  if (Array.isArray(input)) {
    const results = input.map((key) => {
      return remember(() => {
        return loadingFn(loader, key, options)
      }, [Proto, key])
    })
    return results as ReturnType
  } else if (typeof input === 'string') {
    const result = remember(() => {
      return loadingFn(loader, input, options)
    }, [Proto, input])
    return result as ReturnType
  } else {
    const results = Object.entries(input).reduce((acc, [key, path]) => {
      acc[key] = remember(() => {
        return loadingFn(loader, path, options) as Promise<ValueType>
      }, [Proto, path])
      return acc
    }, {} as Record<string, AsyncWritable<ValueType>>)
    return results as ReturnType
  }
}

/**
 * Preloads an asset into cache as a side-effect.
 */
useLoader3.preload = function <T, U extends string | string[], L extends LoaderProto<T>>(
  Proto: L,
  input: U,
  extensions?: Extend<L>
) {
  // const { preload } = useCache()
  // const keys = (Array.isArray(input) ? input : [input]) as string[]
  // return preload(loadingFn<L>(extensions), [Proto, ...keys])
}

/**
 * Removes a loaded asset from cache.
 */
// useLoader3.clear = function <T, U extends string | string[], L extends LoaderProto<T>>(
//   Proto: L,
//   input: U
// ) {
//   const { clear } = useCache()
//   const keys = (Array.isArray(input) ? input : [input]) as string[]
//   return clear([Proto, ...keys])
// }

import type { Loader } from 'three'
import { asyncWritable, type AsyncWritable } from '../lib/asyncWritable'
import { useCache } from '../lib/cache'

type LoaderProto = { new (): Loader }

type ThrelteUseLoader<Loader, ResultType> = {
  loader: Loader
  load: <
    Input extends string | string[] | Record<string, string>,
    Result extends Input extends string
      ? AsyncWritable<ResultType>
      : Input extends string[]
      ? AsyncWritable<ResultType[]>
      : AsyncWritable<Record<keyof Input, ResultType>>
  >(
    input: Input,
    options?: {
      onProgress?: (event: ProgressEvent) => void
    }
  ) => Result
  clear: <Input extends string | string[] | Record<string, string>>(input: Input) => void
}

export const useLoader = <
  Proto extends LoaderProto,
  LoaderReturnType = Awaited<ReturnType<InstanceType<Proto>['loadAsync']>>,
  UseLoaderResult = ThrelteUseLoader<InstanceType<Proto>, LoaderReturnType>
>(
  Proto: Proto,
  options: {
    extend?: (loader: InstanceType<Proto>) => void
  } = {}
): UseLoaderResult => {
  const { remember, clear: clearCacheItem } = useCache()

  // instantiate the loader
  const loader = new Proto()

  // extend the loader if necessary
  options.extend?.(loader as InstanceType<Proto>)

  const load: ThrelteUseLoader<InstanceType<Proto>, LoaderReturnType>['load'] = (
    input,
    options
  ) => {
    if (Array.isArray(input)) {
      // map over the input array and return an array of promises
      const promises = input.map((url) => {
        return remember(() => {
          return loader.loadAsync(url, options?.onProgress)
        }, [Proto, url])
      })

      // return an AsyncWritable that resolves to the array of promises
      const store = asyncWritable(Promise.all(promises))
      return store as any // TODO: Dirty escape hatch
    } else if (typeof input === 'string') {
      // debugger
      const promise = remember(() => {
        return loader.loadAsync(input, (e) => console.log(e))
      }, [Proto, input])

      // return an AsyncWritable that resolves to the promise
      const store = asyncWritable(promise)
      return store as any // TODO: Dirty escape hatch
    } else {
      // map over the input object and return an array of promises
      const promises = Object.values(input).map((url) => {
        return remember(() => {
          return loader.loadAsync(url, options?.onProgress)
        }, [Proto, url])
      })
      // return an AsyncWritable that resolves to the object of promises
      const store = asyncWritable(
        Promise.all(promises).then((results) => {
          return Object.fromEntries(Object.entries(input).map(([key], i) => [key, results[i]]))
        })
      )
      return store as any // TODO: Dirty escape hatch
    }
  }

  const clear = (input: string | string[] | Record<string, string>) => {
    if (Array.isArray(input)) {
      input.forEach((url) => {
        clearCacheItem([Proto, url])
      })
    } else if (typeof input === 'string') {
      clearCacheItem([Proto, input])
    } else {
      Object.entries(input).forEach(([key, url]) => {
        clearCacheItem([Proto, key, url])
      })
    }
  }

  return {
    load,
    clear,
    loader
  } as UseLoaderResult
}

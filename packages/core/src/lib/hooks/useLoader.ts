import type { Loader } from 'three'
import { asyncWritable, type AsyncWritable } from '../lib/asyncWritable'
import { useCache } from '../lib/cache'

type LoaderProto = { new (): Loader }

export type UseLoaderLoadInput = string | string[] | Record<string, string>

type LoaderResultType<TLoader extends Loader> = Awaited<ReturnType<TLoader['loadAsync']>>

export type UseLoaderLoadResult<
  TLoader extends Loader,
  Input extends UseLoaderLoadInput,
  ResultType = LoaderResultType<TLoader>
> = Input extends string
  ? AsyncWritable<ResultType>
  : Input extends string[]
  ? AsyncWritable<ResultType[]>
  : AsyncWritable<Record<keyof Input, ResultType>>

type UseLoaderLoadTransform<TLoader extends Loader> = (result: LoaderResultType<TLoader>) => any

type UseLoaderLoadOptions<TLoader extends Loader> = {
  onProgress?: (event: ProgressEvent) => void
  transform?: UseLoaderLoadTransform<TLoader>
}

type ThrelteUseLoader<TLoader extends Loader> = {
  loader: TLoader
  load: <
    Input extends UseLoaderLoadInput,
    Options extends UseLoaderLoadOptions<TLoader> | undefined,
    ResultType = Options extends UseLoaderLoadOptions<TLoader>
      ? Options['transform'] extends UseLoaderLoadTransform<TLoader>
        ? ReturnType<Options['transform']>
        : LoaderResultType<TLoader>
      : LoaderResultType<TLoader>
  >(
    input: Input,
    options?: Options
  ) => UseLoaderLoadResult<TLoader, Input, ResultType>
  clear: <Input extends string | string[] | Record<string, string>>(input: Input) => void
}

export type UseLoaderOptions<TLoader extends Loader> = {
  /**
   * A loader can be extended to add custom
   * functionality, e.g. add DRACO support.
   */
  extend?: (loader: TLoader) => void
}

export const useLoader = <
  Proto extends LoaderProto,
  UseLoaderResult = ThrelteUseLoader<InstanceType<Proto>>
>(
  Proto: Proto,
  options: UseLoaderOptions<InstanceType<Proto>> = {}
): UseLoaderResult => {
  const { remember, clear: clearCacheItem } = useCache()

  // instantiate the loader
  const loader = new Proto()

  // extend the loader if necessary
  options.extend?.(loader as InstanceType<Proto>)

  const load: ThrelteUseLoader<InstanceType<Proto>>['load'] = (input, options) => {
    if (Array.isArray(input)) {
      // map over the input array and return an array of promises
      const promises = input.map((url) => {
        return remember(async () => {
          const result = await loader.loadAsync(url, options?.onProgress)
          return options?.transform?.(result) ?? result
        }, [Proto, url])
      })

      // return an AsyncWritable that resolves to the array of promises
      const store = asyncWritable(Promise.all(promises))
      return store as any // TODO: Dirty escape hatch
    } else if (typeof input === 'string') {
      // debugger
      const promise = remember(async () => {
        const result = await loader.loadAsync(input, options?.onProgress)
        return options?.transform?.(result) ?? result
      }, [Proto, input])

      // return an AsyncWritable that resolves to the promise
      const store = asyncWritable(promise)
      return store as any // TODO: Dirty escape hatch
    } else {
      // map over the input object and return an array of promises
      const promises = Object.values(input).map((url) => {
        return remember(async () => {
          const result = await loader.loadAsync(url, options?.onProgress)
          return options?.transform?.(result) ?? result
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

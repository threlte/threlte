import { useCache } from '../context/fragments/cache'
import { asyncWritable, type AsyncWritable } from '../lib/asyncWritable'

type AsyncLoader = {
  loadAsync: (url: string, onProgress?: (event: ProgressEvent) => void) => Promise<any>
}

type SyncLoader = {
  load: (
    url: string,
    onLoad: (data: any) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: unknown) => void
  ) => unknown
}

export type Loader = AsyncLoader | SyncLoader

// Some loaders may not have any constructor arguments …
type LoaderProtoWithoutArgs = { new (): Loader }
// … but some other loaders do.
type LoaderProtoWithArgs = { new (...args: any[]): Loader }

export type UseLoaderLoadInput = string | string[] | Record<string, string>

type LoaderResultType<TLoader extends Loader> = TLoader extends AsyncLoader
  ? Awaited<ReturnType<TLoader['loadAsync']>>
  : TLoader extends SyncLoader
    ? Parameters<TLoader['load']>[1] extends (data: infer Result) => void
      ? Result
      : never
    : never

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

type UseLoaderOptionsWithoutArgs<Proto extends LoaderProtoWithoutArgs> = {
  /**
   * A loader can be extended to add custom
   * functionality, e.g. add DRACO support.
   */
  extend?: (loader: InstanceType<Proto>) => void
  /**
   * Arguments to pass to the loader.
   */
  args?: ConstructorParameters<Proto>
}

type UseLoaderOptionsWithArgs<Proto extends LoaderProtoWithArgs> = {
  /**
   * A loader can be extended to add custom
   * functionality, e.g. add DRACO support.
   */
  extend?: (loader: InstanceType<Proto>) => void
  /**
   * Arguments to pass to the loader.
   */
  args: ConstructorParameters<Proto>
}

export type UseLoaderOptions<Proto extends LoaderProtoWithoutArgs> =
  ConstructorParameters<Proto> extends []
    ? UseLoaderOptionsWithoutArgs<Proto>
    : undefined extends ConstructorParameters<Proto>[0]
      ? UseLoaderOptionsWithoutArgs<Proto>
      : UseLoaderOptionsWithArgs<Proto>

export function useLoader<Proto extends LoaderProtoWithoutArgs>(
  Proto: Proto,
  options?: UseLoaderOptions<Proto>
): ThrelteUseLoader<InstanceType<Proto>>
export function useLoader<Proto extends LoaderProtoWithArgs>(
  Proto: Proto,
  options: UseLoaderOptions<Proto>
): ThrelteUseLoader<InstanceType<Proto>>
export function useLoader<Proto extends LoaderProtoWithoutArgs>(
  Proto: Proto,
  options?: UseLoaderOptions<Proto>
): ThrelteUseLoader<InstanceType<Proto>> {
  const { remember, clear: clearCacheItem } = useCache()

  let loader: InstanceType<Proto> | undefined

  const initializeLoader = (): InstanceType<Proto> => {
    // Type-wrestling galore
    const lazyLoader = new Proto(...(((options as any)?.args as []) ?? [])) as InstanceType<Proto>
    // extend the loader if necessary
    options?.extend?.(lazyLoader)
    return lazyLoader
  }

  const load: ThrelteUseLoader<InstanceType<Proto>>['load'] = (input, options) => {
    // Allow Async and Sync loaders
    const loadResource = async (url: string) => {
      if (!loader) {
        loader = initializeLoader()
      }
      if ('loadAsync' in loader) {
        const result = await loader.loadAsync(url, options?.onProgress)
        return options?.transform?.(result) ?? result
      } else {
        return new Promise((resolve, reject) => {
          ;(loader as SyncLoader).load(
            url,
            (data) => resolve(options?.transform?.(data) ?? data),
            (event) => options?.onProgress?.(event),
            reject
          )
        })
      }
    }

    if (Array.isArray(input)) {
      // map over the input array and return an array of promises
      const promises = input.map((url) => {
        return remember(() => loadResource(url), [Proto, url])
      })

      // return an AsyncWritable that resolves to the array of promises
      const store = asyncWritable(Promise.all(promises))
      return store as any // TODO: Dirty escape hatch
    } else if (typeof input === 'string') {
      const promise = remember(() => loadResource(input), [Proto, input])

      // return an AsyncWritable that resolves to the promise
      const store = asyncWritable(promise)
      return store as any // TODO: Dirty escape hatch
    } else {
      // map over the input object and return an array of promises
      const promises = Object.values(input).map((url) => {
        return remember(() => loadResource(url), [Proto, url])
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
  } as ThrelteUseLoader<InstanceType<Proto>>
}

// Type tests

// class WithConstructorParameters {
//   constructor(hello: 'abc' | 'def') {
//     console.log(hello)
//   }

//   loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<any> {
//     return new Promise((r) => r('hello'))
//   }
// }

// class WithOptionalConstructorParameters {
//   constructor(hello?: string) {
//     console.log(hello)
//   }

//   loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<any> {
//     return new Promise((r) => r('hello'))
//   }
// }

// class WithoutConstructorParameters {
//   constructor() {
//     console.log('without')
//   }

//   loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<any> {
//     return new Promise((r) => r('hello'))
//   }
// }

// const shouldFail = () => {
//   useLoader(WithConstructorParameters)
//   useLoader(WithoutConstructorParameters, {
//     args: ['hello']
//   })
// }

// const shouldSucceed = () => {
//   useLoader(WithConstructorParameters, {
//     args: ['abc']
//   })
//   useLoader(WithConstructorParameters, {
//     args: ['abc'],
//     extend(loader) {
//       // …
//     }
//   })
//   useLoader(WithOptionalConstructorParameters)
//   useLoader(WithOptionalConstructorParameters, {
//     extend(loader) {
//       // …
//     }
//   })
//   useLoader(WithOptionalConstructorParameters, {
//     args: [],
//     extend(loader) {
//       // …
//     }
//   })
//   useLoader(WithOptionalConstructorParameters, {
//     args: ['hello'],
//     extend(loader) {
//       // …
//     }
//   })
//   useLoader(WithOptionalConstructorParameters, {
//     args: ['hello']
//   })
//   useLoader(WithoutConstructorParameters)
//   useLoader(WithoutConstructorParameters, {
//     extend(loader) {
//       // …
//     }
//   })
// }

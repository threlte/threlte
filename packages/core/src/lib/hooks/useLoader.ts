import type { ThrelteUseLoader } from '../types/types'
import type { Loader } from 'three'

const loaders: Loader[] = []

export const useLoader: ThrelteUseLoader = <T extends typeof Loader>(
  loader: T,
  memoizeFn: () => InstanceType<T>
): InstanceType<T> => {
  const maybeLoader = loaders.find((ll): ll is InstanceType<T> => ll instanceof loader)
  if (maybeLoader) return maybeLoader
  const newLoader = memoizeFn()
  loaders.push(newLoader)
  return newLoader
}

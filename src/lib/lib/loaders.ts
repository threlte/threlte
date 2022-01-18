import type { Loader } from 'three'

const loaders: Loader[] = []

export const memoizeLoader = <T extends typeof Loader>(
  loader: T,
  getter: () => InstanceType<T>
): InstanceType<T> => {
  const maybeLoader = loaders.find((ll): ll is InstanceType<T> => ll instanceof loader)
  if (maybeLoader) return maybeLoader
  const newLoader = getter()
  loaders.push(newLoader)
  return newLoader
}

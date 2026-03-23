import {
  useLoader,
  useThrelte,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult,
  type UseLoaderOptions
} from '@threlte/core'
import { TextureLoader } from 'three'

export const useTexture = <Input extends UseLoaderLoadInput>(
  input: Input,
  options?: UseLoaderOptions<typeof TextureLoader> &
    Parameters<ReturnType<typeof useLoader<typeof TextureLoader>>['load']>[1]
): UseLoaderLoadResult<TextureLoader, Input> => {
  const loader = useLoader(TextureLoader, options)

  const { renderer } = useThrelte()

  return loader.load(input, {
    ...options,
    transform: (res) => {
      res.colorSpace = renderer.outputColorSpace
      res.needsUpdate = true
      return options?.transform?.(res) ?? res
    }
  })
}

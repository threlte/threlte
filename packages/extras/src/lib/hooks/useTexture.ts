import {
  useLoader,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult,
  type UseLoaderOptions
} from '@threlte/core'
import { TextureLoader } from 'three'

export const useTexture = <Input extends UseLoaderLoadInput>(
  input: Input,
  options?: UseLoaderOptions<TextureLoader>
): UseLoaderLoadResult<TextureLoader, Input> => {
  const loader = useLoader(TextureLoader, options)
  return loader.load(input)
}

import {
  useLoader,
  useThrelte,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult,
  type UseLoaderOptions,
  type Props
} from '@threlte/core'
import { Texture, TextureLoader } from 'three'

export const useTexture = <Input extends UseLoaderLoadInput>(
  input: Input,
  options?: UseLoaderOptions<TextureLoader>,
  textureProps: Props<Texture> = {}
): UseLoaderLoadResult<TextureLoader, Input> => {
  const loader = useLoader(TextureLoader, options)

  const { renderer } = useThrelte()

  return loader.load(input, {
    transform: (res) => {
      res.colorSpace = renderer.outputColorSpace

      for (const prop in textureProps) {
        //@ts-ignore todo type this
        res[prop] = textureProps[prop]
      }

      res.needsUpdate = true
    }
  })
}

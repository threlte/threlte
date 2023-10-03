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
  const texture = loader.load(input)

  const { renderer } = useThrelte()
  const rendererColorSpace = renderer.outputColorSpace

  const assignOptions = (texture: Texture) => {
    console.log(texture)
    texture.colorSpace = rendererColorSpace

    for (const prop in textureProps) {
      //@ts-ignore todo type this
      texture[prop] = textureProps[prop]
    }

    texture.needsUpdate = true
  }

  texture.then((textureResult) => {
    console.log({ textureResult })
    if (textureResult?.constructor?.name == '_Texture') {
      console.log('Texture')
      assignOptions(textureResult as Texture)
      return
    }
    if (Array.isArray(textureResult)) {
      console.log('TextureArr')
      textureResult.map((texture) => assignOptions(texture))
      return
    }
    if (typeof textureResult === 'object') {
      console.log('TextureMap')
      Object.values(textureResult).map((texture) => {
        assignOptions(texture)
      })
      return
    }
  })
  return texture
}

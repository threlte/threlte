import { useThrelte } from '@threlte/core'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

const ktxLoaderInstances: Record<string, KTX2Loader> = {}

export const useKtx = (transcoderPath: string) => {
  const { renderer } = useThrelte()
  const cachedLoader = ktxLoaderInstances[transcoderPath]

  if (cachedLoader) {
    return cachedLoader
  }

  const ktx2Loader = new KTX2Loader()
  ktx2Loader.setTranscoderPath(transcoderPath)
  ktx2Loader.detectSupport(renderer)

  ktxLoaderInstances[transcoderPath] = ktx2Loader

  return ktx2Loader
}

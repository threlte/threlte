import { useThrelte } from '@threlte/core'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

const ktxLoaderInstances: Record<string, KTX2Loader> = {}

export const useKtx2 = (transcoderPath: string): KTX2Loader => {
  const cachedLoader = ktxLoaderInstances[transcoderPath]

  if (cachedLoader) {
    return cachedLoader
  }

  const { renderer } = useThrelte()
  const ktx2Loader = new KTX2Loader()
  ktx2Loader.setTranscoderPath(transcoderPath)
  ktx2Loader.detectSupport(renderer)

  ktxLoaderInstances[transcoderPath] = ktx2Loader

  return ktx2Loader
}

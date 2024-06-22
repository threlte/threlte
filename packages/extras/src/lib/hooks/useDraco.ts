import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const defaultPath = 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/'
const dracoLoaderInstances: Record<string, DRACOLoader> = {}

export const useDraco = (decoderPath = defaultPath): DRACOLoader => {
  const cachedLoader = dracoLoaderInstances[decoderPath]

  if (cachedLoader) {
    return cachedLoader
  }

  const loader = new DRACOLoader().setDecoderPath(decoderPath)
  dracoLoaderInstances[decoderPath] = loader

  return loader
}

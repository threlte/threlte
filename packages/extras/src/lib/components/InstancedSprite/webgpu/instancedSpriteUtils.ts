import type {
  buildSpritesheet as originalBuildSpritesheet,
  useInstancedSprite as originalUseInstancedSprite
} from '../instancedSpriteUtils.js'

const unsupported = (name: string): never => {
  throw new Error(
    `${name} is not yet supported with WebGPU. Please open a GitHub issue if you would like support to be prioritized.`
  )
}

export const useInstancedSprite: typeof originalUseInstancedSprite = () =>
  unsupported('useInstancedSprite')

export const buildSpritesheet: typeof originalBuildSpritesheet = {
  from: () => unsupported('buildSpritesheet.from'),
  fromAseprite: () => unsupported('buildSpritesheet.fromAseprite')
}

export type { SpritesheetMetadata, UseSpriteMetaConfig } from '../instancedSpriteUtils.js'

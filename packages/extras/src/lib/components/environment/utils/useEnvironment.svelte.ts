import { useThrelte } from '@threlte/core'
import type { Scene, Texture } from 'three'

export const useEnvironment = (
  scene: () => Scene,
  texture: () => Texture | undefined,
  isBackground: () => boolean
) => {
  const { invalidate } = useThrelte()

  // save lastScene and restore when scene changes and on unmount
  $effect.pre(() => {
    const currentScene = scene()
    const currentTexture = texture()

    const { background, environment } = currentScene

    if (currentTexture) {
      currentScene.environment = currentTexture

      if (isBackground()) {
        currentScene.background = currentTexture
      }

      invalidate()
    }

    return () => {
      currentScene.background = background
      currentScene.environment = environment
      invalidate()
    }
  })
}

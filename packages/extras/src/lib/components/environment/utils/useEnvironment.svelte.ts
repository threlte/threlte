import { useThrelte } from '@threlte/core'
import type { Scene, Texture } from 'three'

type EnvironmentOptions = {
  scene: Scene
  texture?: Texture | undefined
  isBackground?: boolean
}

export const useEnvironment = (options: () => EnvironmentOptions) => {
  const { scene, texture, isBackground } = $derived(options())
  const { invalidate } = useThrelte()

  // save lastScene and restore when scene changes and on unmount
  $effect.pre(() => {
    const previousBackground = scene.background
    const previousEnvironment = scene.environment

    if (texture) {
      scene.environment = texture

      if (isBackground) {
        scene.background = texture
      }

      invalidate()
    }

    return () => {
      scene.background = previousBackground
      scene.environment = previousEnvironment
      invalidate()
    }
  })
}

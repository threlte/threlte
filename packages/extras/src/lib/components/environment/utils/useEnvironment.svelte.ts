import { useThrelte } from '@threlte/core'
import type { Scene } from 'three'

export const useEnvironment = (
  scene: () => Scene,
  environment: () => Scene['environment'] | undefined,
  isBackground: () => boolean,
  isEnvironment: () => boolean
) => {
  const { invalidate } = useThrelte()

  $effect(() => {
    const currentEnvironment = environment()
    if (currentEnvironment === undefined) return

    const currentScene = scene()
    const { background: lastBackground, environment: lastEnvironment } = currentScene
    const currentIsBackground = isBackground()
    const currentIsEnvironment = isEnvironment()

    if (currentIsEnvironment) {
      currentScene.environment = currentEnvironment
    }

    if (currentIsBackground) {
      currentScene.background = currentEnvironment
    }

    invalidate()

    return () => {
      if (currentIsEnvironment) {
        currentScene.environment = lastEnvironment
      }

      if (currentIsBackground) {
        currentScene.background = lastBackground
      }

      invalidate()
    }
  })
}

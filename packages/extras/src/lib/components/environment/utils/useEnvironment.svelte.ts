import { observe, useThrelte } from '@threlte/core'
import type { Scene, Texture } from 'three'

type EnvironmentOptions = {
  scene: Scene
  texture?: Texture | undefined
  isBackground?: boolean
}

export const useEnvironment = (options: EnvironmentOptions) => {
  const { invalidate } = useThrelte()

  // save lastScene and restore when scene changes and on unmount
  observe(
    () => [options.scene],
    ([scene]) => {
      const { background, environment } = scene

      return () => {
        scene.background = background
        scene.environment = environment
      }
    }
  )

  let background: Scene['background'] | undefined = $state()
  let environment: Scene['environment'] | undefined = $state()

  observe(
    () => [options.scene],
    ([scene]) => {
      background = scene.background
      environment = scene.environment
    }
  )

  $effect(() => {
    if (options.texture === undefined || !options.isBackground) {
      return
    }

    options.scene.background = options.texture
    invalidate()
    return () => {
      // background is allowed to be `null`
      if (background !== undefined) {
        options.scene.background = background
        invalidate()
      }
    }
  })

  $effect(() => {
    if (options.texture === undefined) {
      return
    }

    options.scene.environment = options.texture
    invalidate()
    return () => {
      // environment is allowed to be `null`
      if (environment !== undefined) {
        options.scene.environment = environment
        invalidate()
      }
    }
  })
}

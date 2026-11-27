import { getContext, setContext } from 'svelte'
import { Scene } from 'three'

export interface SceneContext {
  scene: {
    readonly current: Scene
    set(value: Scene): void
  }
}

export const createSceneContext = (scene?: () => Scene | undefined): SceneContext => {
  const defaultScene = new Scene()
  const providedScene = $derived(scene?.())
  let current = $derived(providedScene ?? defaultScene)

  const context: SceneContext = {
    scene: {
      get current() {
        return current
      },
      set(value) {
        current = value
      }
    }
  }

  setContext<SceneContext>('threlte-scene-context', context)

  return context
}

export const useScene = (): SceneContext => {
  const context = getContext<SceneContext>('threlte-scene-context')

  if (!context) {
    throw new Error('useScene can only be used in a child component to <Canvas>.')
  }

  return context
}

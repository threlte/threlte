import { getContext, setContext } from 'svelte'
import { Scene } from 'three'

export type SceneContext = {
  scene: Scene
}

export const createSceneContext = (scene?: Scene): SceneContext => {
  const context: SceneContext = { scene: scene || new Scene() }

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

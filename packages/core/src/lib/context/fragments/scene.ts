import { createContext } from 'svelte'
import { Scene } from 'three'

const [getSceneContext, setScene] = createContext<Scene>()

const setSceneContext = (scene = new Scene()) => setScene(scene)

export { getSceneContext, setSceneContext }

import { StaticState } from '@threlte/studio'

export class SceneConfig extends StaticState {
  /**
   * @min 0
   * @max 5
   * @step 1
   */
  grid = $state({ x: 5, y: 4 })
  color = $state('#592020')
  camera = $state({ x: 10, y: 23, z: 10 })
}

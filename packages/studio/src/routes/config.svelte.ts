import { StaticState } from '@threlte/studio'

export class SceneConfig extends StaticState {
  grid = $state({ x: 5, y: 5 })
  /**
   * @min 0
   * @max 5
   * @step 1
   */
  count = $state(4)
  color = $state('#ff0000')
  camera = $state({ x: 10, y: 23, z: 10 })
}

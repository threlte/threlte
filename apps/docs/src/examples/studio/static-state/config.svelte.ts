import { StaticState } from '@threlte/studio'

export class SceneConfig extends StaticState {
  /**
   * @min 0
   * @max 10
   * @step 0.1
   */
  directionalLightIntensity = $state(3.1)
  /**
   * @min 0
   * @max 1
   */
  ambientLightIntensity = $state(0.13)
  color = $state('#fe3d00')
  /**
   * @min 0
   * @max 1
   */
  opacity = $state(1)

  showBox = $state(true)
}

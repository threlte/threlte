import { StaticState } from '@threlte/studio'

export class BaseConfig extends StaticState {
  /**
   * @min 0
   * @max 1
   */
  opacity = $state(0.717391304347826)
}

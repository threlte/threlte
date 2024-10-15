import type { Box3, Group } from 'three'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

type Dimension = 'width' | 'height' | 'depth'

export type ResizeProps = Props<Group> & {
  /**
   * dimension to constrain by. if not provided, the max of all 3 dimensions is used
   */
  dimension?: Dimension
  /**
   * optional Box3 to use in bounding box calculation
   */
  box?: Box3
  /**
   * whether to use precise bounding box calculation
   * https://threejs.org/docs/index.html#api/en/math/Box3.setFromObject
   */
  precise?: boolean
}

export default class Resize extends SvelteComponent<ResizeProps> {}

import type { Box3, Group } from 'three'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type ResizeProps = Props<Group> & {
  /**
   * axis to constrain by. if not provided, the max of all 3 axes is used.
   */
  axis?: 'x' | 'y' | 'z'
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

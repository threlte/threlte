import type { LOD } from 'three'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type DetailedProps = Props<LOD> & {
  /**
   * distances from the camera. the ith child of `Detailed` will display at distances[i]
   */
  distances?: number[]
  /**
   * passed along to the internal LOD object
   */
  hysteresis?: number
}

export default class Detailed extends SvelteComponent<DetailedProps> {}

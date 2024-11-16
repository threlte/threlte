import type { Props } from '@threlte/core'
import type { Scene } from 'three'

/**
 * [Scissor cut renders](https://threejs.org/examples/?q=mul#webgl_multiple_elements) its contents to the given dom area. The default threlte scene is used if none provided.
 */
export type ViewProps = Props<Scene> & {
  /**
   * The target dom element.
   */
  dom: HTMLElement
}

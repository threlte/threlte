import type { Snippet } from 'svelte'
import type { Scene } from 'three'

/**
 * [Scissor cut renders](https://threejs.org/examples/?q=mul#webgl_multiple_elements) its contents to the given dom area. The default threlte scene is used if none provided.
 */
export type ViewProps = {
  /**
   * The target dom element.
   */
  dom: HTMLElement | undefined

  /**
   * An existing scene to render into the view. If omitted, `<View>` creates a
   * new scene and any children are added to it.
   */
  scene?: Scene

  children?: Snippet
}

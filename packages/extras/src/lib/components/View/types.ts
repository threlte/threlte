import type { Snippet } from 'svelte'
import type { Scene } from 'three'

/**
 * [Scissor cut renders](https://threejs.org/examples/?q=mul#webgl_multiple_elements) its contents to the given dom area. The default threlte scene is used if none provided.
 */
export interface ViewProps {
  /**
   * The element whose area on screen the view renders into, and which
   * receives its pointer events. Nothing renders until it's set.
   */
  dom: HTMLElement | undefined

  /**
   * An existing scene to render into the view. If omitted, `<View>` creates a
   * new scene and any children are added to it.
   */
  scene?: Scene

  /** The content of the view's scene, including its camera. */
  children?: Snippet
}

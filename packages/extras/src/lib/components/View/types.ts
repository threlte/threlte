import type { Snippet } from 'svelte'

/**
 * [Scissor cut renders](https://threejs.org/examples/?q=mul#webgl_multiple_elements) its contents to the given dom area. The default threlte scene is used if none provided.
 */
export type ViewProps = {
  /**
   * The target dom element.
   */
  dom: HTMLElement | undefined
  children: Snippet
}

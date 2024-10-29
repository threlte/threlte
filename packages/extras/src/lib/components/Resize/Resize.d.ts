import type { Box3, Group } from 'three'
import type { Props, Stage } from '@threlte/core'
import type { Component, Snippet } from 'svelte'

export type ResizeProps = Omit<Props<Group>, 'children'> & {
  /**
   * when true, resizes the group when objects are added or removed
   *
   * @default false
   */
  auto?: boolean
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
   *
   * @default true
   */
  precise?: boolean
  /**
   * called after the group has been scaled
   */
  onresize?: () => void
  resize?: () => void
  /**
   * The stage used to resize
   */
  stage?: Stage
  children?: Snippet<[{ ref: Group; resize(): void }]>
}

export type ResizeExports = {
  /**
   * Manually trigger a resize
   */
  resize: () => void
}

declare const Resize: Component<ResizeProps, ResizeExports>

export default Resize
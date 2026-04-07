import type { Props, Stage } from '@threlte/core'
import type { Box3, Group } from 'three'

export type ResizeProps = Props<Group, [{ ref: Group; resize(): void }]> & {
  /**
   * Whether to automatically resize when children are added or removed and when children references update
   * @default true
   */
  auto?: boolean
  /**
   * Specifies which axis to constrain.
   * @default 'max' the maximum axis
   */
  axis?: 'x' | 'y' | 'z' | 'min' | 'max'
  /**
   * Bring your own box to capture the bounding box.
   */
  box?: Box3
  /**
   * Whether to use precise bounding box calculation which is less performant but more accurate
   * @default false
   */
  precise?: boolean
  /**
   * Bring your own stage to control when resizing occurs. If not provided,
   * resizing will occur before the main render stage.
   */
  stage?: Stage
  /**
   * A callback function to run whenever resizing has completed
   */
  onresize?: () => void
}

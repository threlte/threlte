import type { Props, Stage } from '@threlte/core'
import type { Box3, Group } from 'three'

export type ResizeProps = Props<Group, [{ ref: Group; resize(): void }]> & {
  /**
   * If true, will automatically resize when children are added or removed
   * @default false
   */
  auto?: boolean
  /**
   * Specifies which axis to constrain. If not provided, the maximum axis is
   * used
   */
  axis?: 'x' | 'y' | 'z'
  /**
   * Bring your own box to capture the bounding box.
   */
  box?: Box3
  /**
   * If true, use precise bounding box calculation.
   */
  precise?: boolean
  /**
   * Bring your own stage to control when resizing occurs. If not provided,
   * resizing will occur before the main render stage.
   */
  stage?: Stage
  /**
   * A callback function to run whenever resizing is done
   */
  onresize?: () => void
}

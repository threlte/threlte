import type { Props, Stage } from '@threlte/core'
import type { Box3, Group } from 'three'

export interface ResizeProps extends Props<Group, [{ ref: Group; resize(): void }]> {
  /**
   * Resizes again whenever a child `<T>` component mounts or unmounts.
   * @default false
   */
  auto?: boolean
  /**
   * The axis scaled to 1 unit. The children are scaled uniformly, so the
   * other axes keep their proportions.
   * @default the axis the children are largest along
   */
  axis?: 'x' | 'y' | 'z'
  /**
   * The `Box3` the children's bounding box is written to. Pass your own to
   * read the measured box.
   * @default a Box3 shared by every <Resize>
   */
  box?: Box3
  /**
   * Computes the bounding box from every vertex instead of each geometry's
   * bounding box. More accurate for rotated objects, but slower.
   * @default false
   */
  precise?: boolean
  /**
   * The stage the resizing runs in. Resizing happens at most once per frame.
   * @default useStage('<Resize>', { before: renderStage })
   */
  stage?: Stage
  /** Called after every resize. */
  onresize?: () => void
}

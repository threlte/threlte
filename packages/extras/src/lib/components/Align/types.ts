import type { Props, Stage } from '@threlte/core'
import type { Box3, Group, Object3D, Sphere, Vector3 } from 'three'

export interface AlignProps extends Props<Group, [{ align: () => void; ref: Group }]> {
  /**
   * Alignment of the children on the x-axis, from `-1` (their right edge at
   * the origin) through `0` (centered) to `1` (their left edge at the origin).
   * `false` leaves the x-axis untouched.
   * @default 0
   */
  x?: false | number

  /**
   * Alignment of the children on the y-axis, from `-1` (their top edge at the
   * origin) through `0` (centered) to `1` (their bottom edge at the origin).
   * `false` leaves the y-axis untouched.
   * @default 0
   */
  y?: false | number

  /**
   * Alignment of the children on the z-axis, from `-1` (their front edge at
   * the origin) through `0` (centered) to `1` (their back edge at the origin).
   * `false` leaves the z-axis untouched.
   * @default 0
   */
  z?: false | number

  /**
   * Computes the bounding box from every vertex instead of each geometry's
   * bounding box. More accurate for rotated objects, but slower.
   * @see https://threejs.org/docs/#api/en/math/Box3.setFromObject
   * @default false
   */
  precise?: boolean

  /**
   * Realigns automatically whenever a child `<T>` component mounts or
   * unmounts.
   * @default false
   */
  auto?: boolean

  /**
   * Called after every alignment with the measured bounding box and the
   * offsets that were applied.
   */
  onalign?: (event: AlignEventData) => void

  /**
   * The stage the alignment runs in. Aligning happens at most once per frame.
   * @default useStage('<Align>', { before: renderStage })
   */
  stage?: Stage
}

type AlignEventData = {
  /** The outermost group of the `<Align>` component */
  container: Object3D
  /** The width of the bounding box */
  width: number
  /** The height of the bounding box */
  height: number
  /** The depth of the bounding box */
  depth: number
  /** The bounding box of the children before aligning */
  boundingBox: Box3
  /** The bounding sphere of the children before aligning */
  boundingSphere: Sphere
  /** The offset applied to the children */
  center: Vector3
  /** The y-axis share of the offset, `y * height / 2` */
  verticalAlignment: number
  /** The x-axis share of the offset, `x * width / 2` */
  horizontalAlignment: number
  /** The z-axis share of the offset, `z * depth / 2` */
  depthAlignment: number
}

export type AlignExports = {
  align: () => void
}

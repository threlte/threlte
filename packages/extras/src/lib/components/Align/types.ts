import type { Props, Stage } from '@threlte/core'
import type { Box3, Group, Object3D, Sphere, Vector3 } from 'three'

export type AlignProps = Props<Group, [{ align: () => void; ref: Group }]> & {
  /**
   * Align the object on the x-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the x-axis.
   * @default 0
   */
  x?: false | number

  /**
   * Align the object on the y-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the y-axis.
   * @default 0
   */
  y?: false | number

  /**
   * Align the object on the z-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the z-axis.
   * @default 0
   */
  z?: false | number

  /**
   * See [setFromObject](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject)
   * @default false
   */
  precise?: boolean

  /**
   * Injects a plugin in all child `<T>` components to automatically align whenever a component mounts or unmounts, defaults to false
   * @default false
   */
  auto?: boolean

  /**
   * Fires when the child objects have been aligned.
   */
  onalign?: (event: {
    container: Object3D
    width: number
    height: number
    depth: number
    boundingBox: Box3
    boundingSphere: Sphere
    align: Vector3
    verticalAlignment: number
    horizontalAlignment: number
    depthAlignment: number
  }) => void

  /**
   * Bring your own stage to control when aligning occurs. If not provided, aligning will occur before the main render stage.
   * @default useStage('<Align'>, { before: useThrelte().renderStage })
   */
  stage?: Stage
}

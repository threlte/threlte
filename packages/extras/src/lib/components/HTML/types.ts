import type { Props } from '@threlte/core'
import type { Camera, Group, Object3D } from 'three'

export type HTMLProps = Props<Group, [{ render(): void }]> & {
  /**
   * @default true
   */
  autoRender?: boolean

  /**
   * @default false
   */
  transform?: boolean

  calculatePosition?: (
    obj: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ) => [number, number]

  /**
   * @default 0.001
   */
  eps?: number

  /**
   * @default [16777271, 0]
   */
  zIndexRange?: [number, number]

  /**
   * @default false
   */
  sprite?: boolean

  /**
   * @default 'auto'
   */
  pointerEvents?:
    | 'auto'
    | 'none'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'fill'
    | 'stroke'
    | 'all'
    | 'inherit'

  /**
   * @default false
   */
  center?: boolean

  /**
   * @default false
   */
  fullscreen?: boolean

  distanceFactor?: number
  /**
   * @default 'div'
   */
  as?: keyof HTMLElementTagNameMap

  portal?: HTMLElement

  /**
   * Occlusion based off work by Jerome Etienne and James Baicoianu
   * https://www.youtube.com/watch?v=ScZcUEDGjJI
   * as well as Joe Pea in CodePen: https://codepen.io/trusktr/pen/RjzKJx
   * @default false
   */
  occlude?: boolean | Object3D[] | boolean | 'raycast' | 'blending'

  castShadow?: boolean // Cast shadow for occlusion plane
  receiveShadow?: boolean // Receive shadow for occlusion plane

  onvisibilitychange?: (visible: boolean) => void
}

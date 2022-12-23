import type {
  GroupProperties,
  InteractiveObjectProperties,
  Object3DInstanceProperties
} from '@threlte/core'
<<<<<<< HEAD
=======
import type { Camera, ColorRepresentation, Material, Object3D, TextureEncoding } from 'three'

export type EdgesProperties = Omit<LineSegmentsProperties, 'geometry' | 'material'> &
  (
    | {
        color?: ColorRepresentation
        material: never
      }
    | {
        material?: Material | Material[]
        color: never
      }
  ) & {
    threshold?: number
  }

export type HTMLProperties = GroupProperties & {
  transform?: boolean
  calculatePosition: (
    obj: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ) => [number, number]
  eps: number
  occlude: boolean | Object3D[]
  zIndexRange: [number, number]
  sprite: boolean
  pointerEvents:
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
  center: boolean
  fullscreen: boolean
  distanceFactor?: number
  as: keyof HTMLElementTagNameMap
  portal?: HTMLElement
}
>>>>>>> threlte-v5-transition

export type GLTFProperties = Omit<Object3DInstanceProperties, 'object'> & {
  url: string
  /** @deprecated Use `useDraco` instead*/
  dracoDecoderPath?: string
  useDraco?: string | boolean
  useMeshopt?: boolean
  ktxTranscoderPath?: string
} & Omit<InteractiveObjectProperties, 'object'>
